# AWS credentials
variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "aws_region" {
  default = "ca-central-1"
}
# Networking settings
variable "vpc_cidr" {
  default = "10.10.0.0/16"
}
variable "public_subnet" {
  default = "10.10.1.0/24"
}
variable "private_subnet" {
  default = "10.10.2.0/24"
}
# Domain name zone, must be a regisered zone hosted by aws
variable "domain_name" {}
# Email, required for certificate issue by LetsEncrypt
variable "letsenctypt_reg_email" {}
variable "project_name" {}
# db_settings
variable "pg_db" {}
variable "pg_user" {}
variable "pg_password" {}
variable "pg_port" {
  default = "5432"
}
# Docker images of frontend and backend
variable "frontend_image" {}
variable "backend_image" {}
variable "image_tag" {}
# Application settings
variable "jwt_secret" {}
variable "jwt_exp_threshold" {
  default = "60d"
}
# Cloudinary CDN credentials
variable "cdn_name" {
  default = "pairup"
}
variable "cdn_key" {}
variable "cdn_secret" {}
# Production mode switch, set to 'production'
variable "node_env" {}
