terraform {
    backend "s3" {
        bucket = "pairup-tfstate"
        key    = "pairup.state"
        region = "${var.aws_region}"
        profile = "terraform"
    }
}