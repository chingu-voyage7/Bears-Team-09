provider "aws" {
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
  region     = "${var.aws_region}"
}

resource "aws_instance" "server" {
    instance_type = "t2.micro"
    ami = "${var.ec2_ami}"
}

resource "null_resource" "restart_apps" {
    triggers {
        image_tag = "${var.image_tag}"
    }

    connection {
        host = "${aws_instance.server.public_ip}"
        user  = "ec2-user"
        private_key = "${file(var.private_key_path)}"
    }
    provisioner "remote-exec" {
        inline = [
            # kill previous version of app, including gateway nginx
            "sudo docker stop frontend backend",
            "sudo docker container prune -f",
            # run backend
            "sudo docker run --name backend -d --restart unless-stopped -p 8000:8000 -e PGHOST=${var.pg_host} -e PGUSER=${var.pg_user} -e PGPASSWORD=${var.pg_password} -e PGDB=${var.pg_db} -e PGPORT=${var.pg_port} -e JWT_SECRET=${var.jwt_secret} -e JWT_EXP_THRESHOLD='${var.jwt_exp_threshold}' -e CLOUDINARY_NAME=${var.cdn_name} -e CLOUDINARY_KEY=${var.cdn_key} -e CLOUDINARY_SECRET=${var.cdn_secret} -e NODE_ENV=${var.node_env} ${var.backend_image}:${var.image_tag}",
            # run frontend
            "sudo docker run --name frontend -d -p 3000:3000 -e NODE_ENV=${var.node_env} --restart unless-stopped ${var.frontend_image}:${var.image_tag}"
        ]
    }
}
