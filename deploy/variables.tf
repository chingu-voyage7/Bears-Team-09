# AWS CREDENTIALS
variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "aws_region" {
  default = "ca-central-1"
}
# VPC CONFIG
variable "aws_instance_type" {
  default = "t2.micro"
}
variable "vpc_cidr" {
  default = "10.10.0.0/16"
}
variable "public_subnet" {
  default = "10.10.1.0/24"
}
variable "private_subnet" {
  default = "10.10.2.0/24"
}
variable "domain_zone_name" {}
# DB CONFIG
variable "pg_user" {
    default = "postgres"
}
variable "pg_password" {}
variable "pg_db" {
    default = "postgres"
}
variable "pg_port" {
    default = "5432"
}
# BACKEND CONFIG
variable "jwt_secret" {}
variable "jwt_exp_threshold" {
    default = "1 hour"
}
variable "frontend_image" {}
variable "backend_image" {}
variable "deploy_tag" {}
variable "cdn_key" {}
variable "cdn_secret" {}
variable "node_env" {}

# ENcryption
variable "acme_server_url" {
    default = "https://acme-v02.api.letsencrypt.org/directory"
}
variable "domain_owner_email" {
  default = "trolleksii@gmail.com"
}
