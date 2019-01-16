provider "aws" {
    access_key = "${var.aws_access_key}"
    secret_key = "${var.aws_secret_key}"
    region     = "${var.aws_region}"
}
data "aws_availability_zones" "available" {}
resource "aws_default_vpc" "default" {
  tags = {
    Name = "Default VPC"
  }
}
resource "aws_subnet" "public_subnet" {
    vpc_id = "${aws_default_vpc.default.id}"
    cidr_block              = "${var.public_subnet}"
    map_public_ip_on_launch = "true"
    availability_zone       = "${data.aws_availability_zones.available.names[0]}"
}
resource "aws_subnet" "private_subnet" {
    vpc_id = "${aws_default_vpc.default.id}"
    cidr_block              = "${var.private_subnet}"
    availability_zone       = "${data.aws_availability_zones.available.names[0]}"
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
    vpc_security_group_ids = ["${aws_security_group.db_sg.id}"]
    db_subnet_group_name = "${aws_db_subnet_group.db_subnet_group.id}"
    tags {
        Project = "${var.project_name}"
    }
}

resource "aws_instance" "webapp" {
    depends_on = ["${aws_db_instance.db}"]
    ami = "${var.aws_ami}"
    instance_type = "${var.aws_instance_type}"
    subnet_id = "${aws_subnet.public_subnet.id}"
    key_name = "${var.key_name}"
    vpc_security_group_ids = ["${aws_security_group.webapp_sg.id}"]
    connection {
        user  = "ec2-user"
        private_key = "${file(var.private_key_path)}"
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
        private_key = "${file(var.private_key_path)}"
    }

    provisioner "remote-exec" {
        inline = [
            "sudo docker container ls -q | xargs sudo docker stop",
            "sudo docker container prune -f",
            "sudo docker run --rm -e DATABASE_URL=postgres://${var.pg_user}:${var.pg_password}@${aws_db_instance.db.address}/${var.pg_db} ${var.backend_image}:${var.deploy_tag} npm run migrate up",
            "sudo docker run -d -e PGHOST=${aws_db_instance.db.address} -e PGUSER='${var.pg_user}' -e PGPASSWORD='${var.pg_password}' -e PGDB='${var.pg_db}' -e PGPORT='${var.pg_port}' -e JWT_SECRET='${var.jwt_secret}' -e JWT_EXP_THRESHOLD='${var.jwt_exp_threshold}' -p 8000:8000 --restart always --name backend '${var.backend_image}:${var.deploy_tag}'",
            "sudo docker run -d -p 80:80 --restart always --name frontend '${var.frontend_image}:${var.deploy_tag}'"
        ]
    }
}
resource "aws_security_group" "webapp_sg" {
    vpc_id = "${aws_default_vpc.default.id}"
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
    vpc_id = "${aws_default_vpc.default.id}"
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
