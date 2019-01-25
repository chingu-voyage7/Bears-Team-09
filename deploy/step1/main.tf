# This config creates S3 bucket and DynamoDB table to store infrastructure
# status and lock record. If you change bucket/db table name - you have to
# reflect it in 'step2' config

#################
### Variables ###
#################
variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "aws_region" {
  default = "ca-central-1"
}

##################
### AWS config ###
##################

provider "aws" {
    access_key = "${var.aws_access_key}"
    secret_key = "${var.aws_secret_key}"
    region = "${var.aws_region}"
}

resource "aws_s3_bucket" "pairup-state" {
    bucket = "pairup-terraform-remote-state"
    region = "${var.aws_region}"
    versioning {
      enabled = true
    }

    lifecycle {
      prevent_destroy = true
    }

    tags {
      Name = "S3 Remote Terraform State Store"
      Project = "${var.project_name}"
    }
}

resource "aws_dynamodb_table" "dynamodb-terraform-state-lock" {
  name = "terraform-state-lock"
  hash_key = "LockID"
  read_capacity = 1
  write_capacity = 1
  attribute {
    name = "LockID"
    type = "S"
  }

  tags {
    Name = "DynamoDB Terraform State Lock Table"
    Project = "${var.project_name}"
  }
}
