# output "amazon_issued_dns" {
#   value = "${aws_instance.server.public_dns}"
# }

# output "registered_fqdn" {
#   value = "${aws_route53_record.root_a_record.name}"
# }

# Private key in case if there is a need to get into EC2 instance
# output "private_key" {
#   value = "${tls_private_key.ssh_key.private_key_pem}"
# }