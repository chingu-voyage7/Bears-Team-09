terraform {
    backend "s3" {
        bucket = "pairup-tfstate"
        key    = "pairup.state"
        region = "ca-central-1"
        profile = "terraform"
    }
}