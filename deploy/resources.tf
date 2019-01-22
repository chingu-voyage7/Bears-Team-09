provider "aws" {
    access_key = "${var.aws_access_key}"
    secret_key = "${var.aws_secret_key}"
    region = "${var.aws_region}"
}
provider "acme" {
  server_url = "${var.acme_server_url}"
}
resource "acme_registration" "reg" {
  account_key_pem = "${tls_private_key.website_key.private_key_pem}"
  email_address   = "${var.domain_owner_email}"
}
resource "acme_certificate" "certificate" {
  account_key_pem           = "${acme_registration.reg.account_key_pem}"
  common_name               = "www.example.com"
  subject_alternative_names = ["www2.example.com"]

  dns_challenge {
    provider = "route53"
  }
}
data "aws_availability_zones" "available" {}
data "aws_route53_zone" "zone" {
  name         = "${var.domain_zone_name}"
  private_zone = "false"
}
resource "tls_private_key" "ssh_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}
resource "tls_private_key" "website_key" {
  algorithm = "RSA"
}
resource "aws_key_pair" "keypair" {
    public_key = "${tls_private_key.ssh_key.public_key_openssh}"
}
resource "aws_vpc" "main" {
    cidr_block = "${var.vpc_cidr}"
    enable_dns_hostnames = "true"
}
resource "aws_subnet" "public_subnet" {
    vpc_id = "${aws_vpc.main.id}"
    cidr_block              = "${var.public_subnet}"
    map_public_ip_on_launch = "true"
    availability_zone       = "${data.aws_availability_zones.available.names[0]}"
}
resource "aws_subnet" "private_subnet" {
    vpc_id = "${aws_vpc.main.id}"
    cidr_block              = "${var.private_subnet}"
    availability_zone       = "${data.aws_availability_zones.available.names[1]}"
}
resource "aws_internet_gateway" "igw" {
    vpc_id = "${aws_vpc.main.id}"
}
resource "aws_route_table" "rtb" {
  vpc_id = "${aws_vpc.main.id}"

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.igw.id}"
  }
}
resource "aws_route_table_association" "rta-subnet" {
  subnet_id      = "${aws_subnet.public_subnet.id}"
  route_table_id = "${aws_route_table.rtb.id}"
}
resource "aws_db_subnet_group" "db_subnet_group" {
    description = "Postgres DB subnet group"
    subnet_ids = ["${aws_subnet.private_subnet.id}", "${aws_subnet.public_subnet.id}"]
}
resource "aws_db_instance" "db" {
    identifier             = "${var.project_name}-pg"
    allocated_storage      = "20"
    engine                 = "postgres"
    engine_version         = "10.6"
    instance_class         = "db.t2.micro"
    multi_az               = false
    publicly_accessible    = false
    skip_final_snapshot    = true
    name                   = "${var.pg_db}"
    username               = "${var.pg_user}"
    password               = "${var.pg_password}"
    port                   = "${var.pg_port}"
    vpc_security_group_ids = ["${aws_security_group.db_sg.id}"]
    db_subnet_group_name = "${aws_db_subnet_group.db_subnet_group.id}"
    tags {
        Project = "${var.project_name}"
    }
}
data "aws_ami" "amazon_linux" {
  most_recent = "true"
  filter {
    name   = "architecture"
    values = ["x86_64"]
  }

  filter {
    name   = "owner-alias"
    values = ["amazon"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}
resource "aws_instance" "webapp" {
    depends_on = ["aws_db_instance.db"]
    ami                       = "${data.aws_ami.amazon_linux.image_id}"
    instance_type             = "t2.micro"
    associate_public_ip_address = "true"
    subnet_id                 = "${aws_subnet.public_subnet.id}"
    key_name                  = "${aws_key_pair.keypair.key_name}"
    vpc_security_group_ids    = ["${aws_security_group.sg.id}"]
    connection {
        user                  = "ec2-user"
        private_key           = "${tls_private_key.ssh_key.private_key_pem}"
    }
    provisioner "remote-exec" {
        inline = [
            "sudo yum update -y",
            "sudo amazon-linux-extras install docker -y",
            "sudo service docker start"
        ]
    }

    tags {
        project = "${var.project_name}"
    }
}
resource "null_resource" "vm" {
    triggers {
        deploy_tag = "${var.deploy_tag}"
    }

    connection {
        host = "${aws_instance.webapp.public_ip}"
        user  = "ec2-user"
        private_key = "${tls_private_key.ssh_key.private_key_pem}"
    }

    provisioner "remote-exec" {
        inline = [
            "sudo docker container ls -q | xargs sudo docker stop",
            "sudo docker container prune -f",
            "sudo docker run --rm -e DATABASE_URL=postgres://${var.pg_user}:${var.pg_password}@${aws_db_instance.db.address}/${var.pg_db} ${var.backend_image}:${var.deploy_tag} npm run migrate up",
            "sudo docker run -d -e PGHOST='${aws_db_instance.db.address}' -e PGUSER='${var.pg_user}' -e PGPASSWORD='${var.pg_password}' -e PGDB='${var.pg_db}' -e PGPORT='${var.pg_port}' -e JWT_SECRET='${var.jwt_secret}' -e JWT_EXP_THRESHOLD='${var.jwt_exp_threshold}' -e CLOUDINARY_KEY='${var.cdn_key}' -e CLOUDINARY_SECRET='${var.cdn_secret}' -e NODE_ENV='${var.node_env}' -p 8000:8000 --restart always --name backend '${var.backend_image}:${var.deploy_tag}'",
            "sudo docker run -d -e NODE_ENV='${var.node_env}' -e BACKEND_URL='http://${aws_instance.webapp.public_dns}:8000' -p 80:3000 --restart always --name frontend '${var.frontend_image}:${var.deploy_tag}'"
        ]
    }
}
resource "aws_security_group" "webapp_sg" {
    vpc_id = "${aws_vpc.main.id}"
    name = "webapp_sg"
    description = "WebApp Security Group"
    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    ingress {
        from_port = 80
        to_port  = 80
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    ingress {
        from_port = 443
        to_port  = 443
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    ingress {
        from_port = 8000
        to_port  = 8000
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
    tags {
        project = "${var.project_name}"
    }
}
resource "aws_security_group" "db_sg" {
    vpc_id = "${aws_vpc.main.id}"
    name = "db_sg"
    description = "PostgreSQL Security Group"
    ingress {
        from_port = "${var.pg_port}"
        to_port = "${var.pg_port}"
        protocol = "tcp"
        cidr_blocks = ["${aws_subnet.public_subnet.cidr_block}"]
    }
    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
    tags {
        Project = "${var.project_name}"
    }
}
resource "aws_route53_record" "record" {
  zone_id = "${data.aws_route53_zone.zone.id}"
  name    = "${var.project_name}.${data.aws_route53_zone.zone.name}"
  type    = "A"
  ttl     = "300"
  records = ["${aws_instance.webapp.public_ip}"]
}
output "fqdn" {
  value = "aws_route53_record.record.name"
}
