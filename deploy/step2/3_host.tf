data "aws_ami" "amazon_linux" {
  most_recent = "true"
  filter {
    name   = "name"
    values = ["amzn2-ami*gp2"]
  }
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

resource "tls_private_key" "ssh_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

output "private_key" {
  value = "${tls_private_key.ssh_key.private_key_pem}"
}

resource "aws_key_pair" "my_keypair" {
  public_key = "${tls_private_key.ssh_key.public_key_openssh}"
}

resource "aws_security_group" "server" {
    vpc_id = "${aws_vpc.main.id}"
    name = "${var.project_name}-server"
    description = "Web Application Server"
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
    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
    tags {
        Name = "Security group for the Web Server"
        Project = "${var.project_name}"
    }
}

resource "aws_instance" "server" {
    depends_on = ["aws_db_instance.db"]
    ami                       = "${data.aws_ami.amazon_linux.image_id}"
    instance_type             = "t2.micro"
    associate_public_ip_address = "true"
    subnet_id                 = "${aws_subnet.public_subnet.id}"
    key_name                  = "${aws_key_pair.my_keypair.key_name}"
    vpc_security_group_ids    = ["${aws_security_group.server.id}"]
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
        Name = "Web Server"
        Project = "${var.project_name}"
    }
}

data "template_file" "nginx_gateway" {
    template = "${file("dropins/nginx.tpl")}"
    vars = {
        frontend_name = "${var.frontend_image}"
        backend_name = "${var.backend_image}"
        server_name = "${var.domain_name}"
    }
}

# These provisioners will run only once on instance creation
resource "null_resource" "copy_certificates" {
    connection {
        host = "${aws_instance.server.public_ip}"
        user  = "ec2-user"
        private_key = "${tls_private_key.ssh_key.private_key_pem}"
    }
    provisioner "file" {
        content = "${acme_certificate.certificate.certificate_pem}"
        destination = "/tmp/certificate.pem"
    }
    provisioner "file" {
        content = "${acme_certificate.certificate.private_key_pem}"
        destination = "/tmp/private_key.pem"
    }
    provisioner "remote-exec" {
        inline = [
            "sudo mkdir -p /etc/nginx/certs",
            "sudo mv /tmp/certificate.pem /etc/nginx/certs/certificate.pem",
            "sudo mv /tmp/private_key.pem /etc/nginx/certs/private_key.pem",
            "sudo chown -R root:root /etc/nginx",
            "sudo chmod 600 /etc/nginx/certs/*"
        ]
    }
}

# this provisioner will run each time when variable `image_tag` is changed
resource "null_resource" "restart_apps" {
    triggers {
        image_tag = "${var.image_tag}"
    }

    connection {
        host = "${aws_instance.server.public_ip}"
        user  = "ec2-user"
        private_key = "${tls_private_key.ssh_key.private_key_pem}"
    }
    provisioner "file" {
        content = "${data.template_file.nginx_gateway.rendered}"
        destination = "/tmp/nginx.conf"
    }
    provisioner "remote-exec" {
        inline = [
            # kill previous version of app, including gateway nginx
            "sudo docker stop gateway frontend backend",
            "sudo docker container prune -f",
            # Create docker network, so that our docker containers could reach each other
            "sudo docker network create --driver bridge ${var.project_name}-net",
            "sudo docker run --name gateway -d --network ${var.project_name}-net -v /tmp/nginx.conf:/etc/nginx/nginx.conf -v /etc/nginx/certs/certificate.pem:/etc/nginx/certificate.pem -v /etc/nginx/certs/private_key.pem:/etc/nginx/private_key.pem -p 80:80 -p 443:443 nginx:stable-alpine",
            # run migrations if any
            "sudo docker run --rm -e DATABASE_URL=postgres://${var.pg_user}:${var.pg_password}@${aws_db_instance.db.address}/${var.pg_db} ${var.backend_image}:${var.image_tag} npm run migrate up",
            # run backend
            "sudo docker run --name ${var.backend_image} -d --network ${var.project_name}-net --restart always -e PGHOST=${aws_db_instance.db.address} -e PGUSER=${var.pg_user} -e PGPASSWORD=${var.pg_password} -e PGDB=${var.pg_db} -e PGPORT=${var.pg_port} -e JWT_SECRET=${var.jwt_secret} -e JWT_EXP_THRESHOLD=${var.jwt_exp_threshold} -e CLOUDINARY_KEY=${var.cdn_key} -e CLOUDINARY_SECRET=${var.cdn_secret} -e NODE_ENV=${var.node_env} ${var.backend_image}:${var.image_tag}",
            # run frontend
            "sudo docker run --name ${var.frontend_image} -d --network ${var.project_name}-net -e NODE_ENV=${var.node_env} -e BACKEND_URL=https://${var.domain_name}/api --restart always ${var.frontend_image}:${var.image_tag}"
        ]
    }
}

