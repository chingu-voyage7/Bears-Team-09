output "aws_public_dns" {
    value = "${aws_instance.webapp.public_dns}"
}