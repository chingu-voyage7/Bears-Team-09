# Filenames
DEV_COMPOSE_FILE := docker/dev/docker-compose.yml

# Docker Compose Project Names
DEV_PROJECT := chingu

.PHONY: run test

run:
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) pull
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) build --pull app
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) run --rm db_probe
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) run --rm app run migrate up
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) up app

test:
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) pull
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) build --pull app
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) run --rm db_probe
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) run --rm app run migrate up
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) up test