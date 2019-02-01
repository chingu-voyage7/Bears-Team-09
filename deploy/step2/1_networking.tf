data "aws_availability_zones" "available" {}

resource "aws_vpc" "main" {
    cidr_block = "${var.vpc_cidr}"
    enable_dns_hostnames = "true"
}

resource "aws_subnet" "public_subnet" {
    vpc_id = "${aws_vpc.main.id}"
    cidr_block              = "${var.public_subnet}"
    map_public_ip_on_launch = "true"
    availability_zone       = "${data.aws_availability_zones.available.names[0]}"
}

resource "aws_subnet" "private_subnet" {
    vpc_id = "${aws_vpc.main.id}"
    cidr_block              = "${var.private_subnet}"
    availability_zone       = "${data.aws_availability_zones.available.names[1]}"
}

resource "aws_internet_gateway" "igw" {
    vpc_id = "${aws_vpc.main.id}"
}

resource "aws_route_table" "rtb" {
  vpc_id = "${aws_vpc.main.id}"

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.igw.id}"
  }
}

resource "aws_route_table_association" "rta-subnet" {
  subnet_id      = "${aws_subnet.public_subnet.id}"
  route_table_id = "${aws_route_table.rtb.id}"
}
