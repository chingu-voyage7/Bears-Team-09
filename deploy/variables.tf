# AWS CREDENTIALS
variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "private_key_path" {}
variable "key_name" {
    default = "key"
}
# VM CONFIG
variable "aws_region" {
  default = "ca-central-1"
}
variable "aws_ami" {
  default = "ami-076b4adb3f90cd384"
}
variable "aws_instance_type" {
  default = "t2.micro"
}
variable "subnet" {
  default = "172.31.201.0/24"
}
# DB CONFIG
variable "pg_host" {}
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
variable "project_name" {
    default = "pairup"
}
variable "frontend_image" {}
variable "backend_image" {}
