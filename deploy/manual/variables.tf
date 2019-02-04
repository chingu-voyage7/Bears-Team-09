# AWS credentials
variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "aws_region" {
  default = "ca-central-1"
}
variable "ec2_ami" {}
variable "private_key_path" {}
variable "domain_name" {}
variable "project_name" {}
# db_settings
variable "pg_host" {}
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
