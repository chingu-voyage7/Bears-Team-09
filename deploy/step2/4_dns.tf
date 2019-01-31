data "aws_route53_zone" "zone" {
  name         = "${var.domain_name}."
  private_zone = "false"
}

resource "aws_route53_record" "root_a_record" {
  zone_id = "${data.aws_route53_zone.zone.id}"
  name    = "${data.aws_route53_zone.zone.name}"
  type    = "A"
  ttl     = "300"
  records = ["${aws_instance.server.public_ip}"]
}

provider "acme" {
  server_url = "https://acme-v02.api.letsencrypt.org/directory"
}

resource "tls_private_key" "private_key" {
  algorithm = "RSA"
}

resource "acme_registration" "reg" {
  account_key_pem = "${tls_private_key.private_key.private_key_pem}"
  email_address   = "${var.letsenctypt_reg_email}"
}

resource "acme_certificate" "certificate" {
  account_key_pem           = "${acme_registration.reg.account_key_pem}"
  common_name               = "${aws_route53_record.root_a_record.fqdn}"
  subject_alternative_names = ["www.${aws_route53_record.root_a_record.fqdn}"]
  dns_challenge {
    provider = "route53"
    config {
      AWS_ACCESS_KEY_ID     = "${var.aws_access_key}"
      AWS_SECRET_ACCESS_KEY = "${var.aws_secret_key}"
      AWS_DEFAULT_REGION    = "${var.aws_region}"
    }
  }
}
