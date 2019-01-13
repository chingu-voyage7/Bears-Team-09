# Filenames
DEV_COMPOSE_FILE := docker/dev/docker-compose.yml

# Docker-compose Project Name
DEV_PROJECT := chingu

# Inspect docker-compose exit code, and check if it is 0
INSPECT := $$(docker-compose -p $$1 -f $$2 ps -q $$3 | xargs -I ARGS docker inspect -f "{{ .State.ExitCode }}" ARGS)

CHECK := @bash -c '\
  if [[ $(INSPECT) -ne 0 ]]; \
  then exit $(INSPECT); fi' VALUE

.PHONY: test run clean

test:
	@ echo "Pulling dependencies from Docker Hub..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) pull
	@ echo "Building immages..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) build --pull app
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) build --pull test
	@ echo "Waiting while database is ready..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) run --rm db_probe
	@ echo "Performing migrations..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) run --rm app run migrate up
	@ echo "Running unit tests..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) run --rm app test
	@ docker container ls
	@ echo "Running integration tests..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) run --rm test
	${CHECK} $(DEV_PROJECT) $(DEV_COMPOSE_FILE) test

run:
	@ echo "Pulling dependencies from Docker Hub..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) pull
	@ echo "Building immages..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) build --pull app
	@ echo "Waiting while database is ready..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) run --rm db_probe
	@ echo "Performing migrations..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) run --rm app run migrate up
	@ echo "Running the app..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) up app

clean:
	@ echo "Cleaning environment..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) down -v
	@ docker images -q -f dangling=true -f label=application=$(REPO_NAME) | xargs -I ARGS docker rmi -f ARGS
	@ echo "Clean complete"