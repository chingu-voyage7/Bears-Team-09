resource "aws_db_subnet_group" "db_subnet_group" {
    description = "Postgres DB subnet group"
    subnet_ids = ["${aws_subnet.private_subnet.id}", "${aws_subnet.public_subnet.id}"]
}

resource "aws_db_instance" "db" {
    identifier             = "${var.project_name}-pg"
    allocated_storage      = "20"
    engine                 = "postgres"
    engine_version         = "10.6"
    instance_class         = "db.t2.micro"
    multi_az               = false
    publicly_accessible    = false
    skip_final_snapshot    = true
    name                   = "${var.pg_db}"
    username               = "${var.pg_user}"
    password               = "${var.pg_password}"
    port                   = "${var.pg_port}"
    vpc_security_group_ids = ["${aws_security_group.db.id}"]
    db_subnet_group_name = "${aws_db_subnet_group.db_subnet_group.id}"
    tags {
        Project = "${var.project_name}"
    }
}

resource "aws_security_group" "db" {
    vpc_id = "${aws_vpc.main.id}"
    name = "${var.project_name}-db"
    description = "PostgreSQL Security Group"
    ingress {
        from_port = "${var.pg_port}"
        to_port = "${var.pg_port}"
        protocol = "tcp"
        cidr_blocks = ["${aws_subnet.public_subnet.cidr_block}"]
    }
    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
    tags {
        project = "${var.project_name}"
    }
}