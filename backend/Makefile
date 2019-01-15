# Project variables
PROJECT_NAME ?= pairup
ORG_NAME ?= trolleksii
REPO_NAME ?= $(PROJECT_NAME)

# Filenames
DEV_COMPOSE_FILE := ../docker/dev/docker-compose.yml
REL_COMPOSE_FILE := ../docker/release/docker-compose.yml

# Docker Compose Project Names
REL_PROJECT := $(PROJECT_NAME)$(BUILD_ID)
DEV_PROJECT := $(REL_PROJECT)-dev

# Application Service Name - must match Docker Compose release specification application service name
FRONTEND_SERVICE_NAME := backend
BACKEND_SERVICE_NAME := frontend

# Build tag expression - can be used to evaulate a shell expression at runtime
BUILD_TAG_EXPRESSION ?= date -u +%Y%m%d%H%M%S

# Execute shell expression
BUILD_EXPRESSION := $(shell $(BUILD_TAG_EXPRESSION))

# Build tag - defaults to BUILD_EXPRESSION if not defined
BUILD_TAG ?= $(BUILD_EXPRESSION)

# Use these settings to specify a custom Docker registry
DOCKER_REGISTRY ?= docker.io

# WARNING: Set DOCKER_REGISTRY_AUTH to empty for Docker Hub
# Set DOCKER_REGISTRY_AUTH to auth endpoint for private Docker registry
DOCKER_REGISTRY_AUTH ?=

# Utility functions
INFO := @bash -c 'echo "=> $$1";' VALUE

## Get an exit code of a docker-compose task
INSPECT := $$(docker-compose -p $$1 -f $$2 ps -q $$3 | xargs -I ARGS docker inspect -f "{{ .State.ExitCode }}" ARGS)

## Check if docker compose test run successfully
CHECK := @bash -c '\
  if [[ $(INSPECT) -ne 0 ]]; \
  then exit $(INSPECT); fi' VALUE

# Get container id of application service container
FE_CONTAINER_ID := $$(docker-compose -p $(REL_PROJECT) -f $(REL_COMPOSE_FILE) ps -q $(FRONTEND_SERVICE_NAME))
BE_CONTAINER_ID := $$(docker-compose -p $(REL_PROJECT) -f $(REL_COMPOSE_FILE) ps -q $(BACKEND_SERVICE_NAME))

# Get image id of application service
FE_IMAGE_ID := $$(docker inspect -f '{{ .Image }}' $(FE_CONTAINER_ID))

BE_IMAGE_ID := $$(docker inspect -f '{{ .Image }}' $(BE_CONTAINER_ID))

# Repository Filter
ifeq ($(DOCKER_REGISTRY), docker.io)
	REPO_FILTER := $(ORG_NAME)/$(REPO_NAME)[^[:space:]|\$$]*
else
	REPO_FILTER := $(DOCKER_REGISTRY)/$(ORG_NAME)/$(REPO_NAME)[^[:space:]|\$$]*
endif

# Introspect repository tags
FE_REPO_EXPR := $$(docker inspect -f '{{range .RepoTags}}{{.}} {{end}}' $(FE_IMAGE_ID) | grep -oh "$(REPO_FILTER)" | xargs)
BE_REPO_EXPR := $$(docker inspect -f '{{range .RepoTags}}{{.}} {{end}}' $(BE_IMAGE_ID) | grep -oh "$(REPO_FILTER)" | xargs)

# Extract build tag arguments
ifeq (buildtag,$(firstword $(MAKECMDGOALS)))
	BUILDTAG_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  ifeq ($(BUILDTAG_ARGS),)
  	$(error You must specify a tag)
  endif
  $(eval $(BUILDTAG_ARGS):;@:)
endif

# Extract tag arguments
ifeq (tag,$(firstword $(MAKECMDGOALS)))
  TAG_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  ifeq ($(TAG_ARGS),)
    $(error You must specify a tag)
  endif
  $(eval $(TAG_ARGS):;@:)
endif

# Deploy settings
TERRAFORM_VERSION ?= 0.11.1

.PHONY: test release tag buildtag login logout publish deploy run clean

test:
	${INFO} "Pulling dependencies from Docker Hub..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) pull
	${INFO} "Building images..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) build --pull backend
	${INFO} "Waiting while database is ready..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) run --rm db_probe
	${INFO} "Performing migrations..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) run --rm backend npm run migrate up
	${INFO} "Running unit tests..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) run backend npm test
	${CHECK} $(DEV_PROJECT) $(DEV_COMPOSE_FILE) backend
	${INFO} "Test complete"

release:
	${INFO} "Building images..."
	@ docker-compose -p $(REL_PROJECT) -f $(REL_COMPOSE_FILE) pull
	@ docker-compose -p $(REL_PROJECT) -f $(REL_COMPOSE_FILE) build backend
	@ docker-compose -p $(REL_PROJECT) -f $(REL_COMPOSE_FILE) build --pull test
	${INFO} "Waiting while database is ready..."
	@ docker-compose -p $(REL_PROJECT) -f $(REL_COMPOSE_FILE) run --rm db_probe
	${INFO} "Performing migrations..."
	@ docker-compose -p $(REL_PROJECT) -f $(REL_COMPOSE_FILE) run --rm backend npm run migrate up
	${INFO} "Running integration tests..."
	@ docker-compose -p $(REL_PROJECT) -f $(REL_COMPOSE_FILE) up test
	${CHECK} $(REL_PROJECT) $(REL_COMPOSE_FILE) test
	${INFO} "Building frontend container..."
	@ docker-compose -p $(REL_PROJECT) -f $(REL_COMPOSE_FILE) build --pull frontend
	@ docker-compose -p $(REL_PROJECT) -f $(REL_COMPOSE_FILE) up -d frontend
	${INFO} "Build and release complete"

run:
	${INFO} "Pulling dependencies from Docker Hub..."
	@ docker-compose -p $(REL_PROJECT) -f $(REL_COMPOSE_FILE) pull
	${INFO} "Building immages..."
	@ docker-compose -p $(REL_PROJECT) -f $(REL_COMPOSE_FILE) build --pull backend
	${INFO} "Waiting while database is ready..."
	@ docker-compose -p $(REL_PROJECT) -f $(REL_COMPOSE_FILE) run --rm db_probe
	${INFO} "Performing migrations..."
	@ docker-compose -p $(REL_PROJECT) -f $(REL_COMPOSE_FILE) run --rm backend npm run migrate up
	${INFO} "Running the app..."
	@ docker-compose -p $(REL_PROJECT) -f $(REL_COMPOSE_FILE) up backend

tag:
	${INFO} "Tagging release image with tags $(TAG_ARGS)..."
	@ $(foreach tag,$(TAG_ARGS), docker tag $(FE_IMAGE_ID) $(DOCKER_REGISTRY)/$(ORG_NAME)/$(REPO_NAME)-front:$(tag);)
	@ $(foreach tag,$(TAG_ARGS), docker tag $(BE_IMAGE_ID) $(DOCKER_REGISTRY)/$(ORG_NAME)/$(REPO_NAME)-back:$(tag);)
	${INFO} "Tagging complete"

buildtag:
	${INFO} "Tagging release image with suffix $(BUILD_TAG) and build tags $(BUILDTAG_ARGS)..."
	@ $(foreach tag,$(BUILDTAG_ARGS), docker tag $(FE_IMAGE_ID) $(DOCKER_REGISTRY)/$(ORG_NAME)/$(REPO_NAME)-front:$(tag).$(BUILD_TAG);)
	@ $(foreach tag,$(BUILDTAG_ARGS), docker tag $(BE_IMAGE_ID) $(DOCKER_REGISTRY)/$(ORG_NAME)/$(REPO_NAME)-back:$(tag).$(BUILD_TAG);)
	${INFO} "Tagging complete"

login:
	${INFO} "Logging in to Docker registry $$DOCKER_REGISTRY..."
	@ docker login -u $$DOCKER_USER -p $$DOCKER_PASSWORD $(DOCKER_REGISTRY_AUTH)
	${INFO} "Logged in to Docker registry $$DOCKER_REGISTRY"

logout:
	${INFO} "Logging out of Docker registry $$DOCKER_REGISTRY..."
	@ docker logout
	${INFO} "Logged out of Docker registry $$DOCKER_REGISTRY"

publish:
	${INFO} "Publishing release image $(IMAGE_ID) to $(DOCKER_REGISTRY)/$(ORG_NAME)/$(REPO_NAME)..."
	@ $(foreach tag,$(shell echo $(FE_REPO_EXPR)), docker push $(tag);)
	@ $(foreach tag,$(shell echo $(BE_REPO_EXPR)), docker push $(tag);)
	${INFO} "Publish complete"

deploy:
	${INFO} "Deploying..."
	@ printf $$AWS_KEY_STRING > $$AWS_SSH_KEY_PATH
	@ wget https://releases.hashicorp.com/terraform/$(TERRAFORM_VERSION)/terraform_$(TERRAFORM_VERSION)_linux_amd64.zip
	@ unzip terraform_$(TERRAFORM_VERSION)_linux_amd64.zip
	@ terraform init
	@ terraform apply -auto-approve
		-var aws_access_key='$$AWS_ACCESS_KEY' && \
		-var aws_secret_key='$$AWS_SECRET_KEY' && \
		-var key_name='$$AWS_KEY_NAME' && \
		-var private_key_path='$$AWS_SSH_KEY_PATH' && \
		-var project_name='$(PROJECT_NAME)' && \
		-var pg_host='$$PG_HOST' && \
		-var pg_user='$$PG_USER' && \
		-var pg_db='$$PG_DB' && \
		-var pg_password='$$PG_PASSWORD' && \
		-var jwt_secret='$$JWT_SECRET' && \
		-var backend_image='$(DOCKER_REGISTRY)/$(ORG_NAME)/$(REPO_NAME)-back' && \
		-var frontend_image='$(DOCKER_REGISTRY)/$(ORG_NAME)/$(REPO_NAME)-front'

clean:
	${INFO} "Cleaning environment..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) down -v
	@ docker-compose -p $(REL_PROJECT) -f $(REL_COMPOSE_FILE) down -v
	@ docker images -q -f dangling=true -f label=application=$(REPO_NAME) | xargs -I ARGS docker rmi -f ARGS
	${INFO} "Clean complete"

-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEArFTqW/N7xUy2PxuaWVkcY+C8WrqyTJhvMTfjCfd4EbX5TuEVsjTnn+K9kUUv
TR/nftQarfsLucJLVon9vPaVb6oE3rYCkJsjtqeKqoBEcRvQbxqFO627WfxL4N7zJqsUdL7ViOYX
cXaRZZWf8+aWwro1mEeOMBh6KCukkNQvQpUNilyOUmKmWZtsX7EIchWJa62LH6FQoXptmFqyh+q9
qErUpuKjWuKLjKt8lavm9G3Xgi3XbhxRnpOMFrFVeUk3T352bATIylhwUXqrErxwRQKja9FWsIYT
o95Ro2s1L65yjGlaQxXDDiCEeOhtVc/M+lE7kOWb7QU0bG9OULuZ1QIDAQABAoIBAHjOVjP7bcqT
yjZXLU5xL3u8sY2QzyjuuxPvr5LvDhasUIbBNypj9/OXSXiq3Uvdj7TTD5jjIgcocxPJTDzJR1yt
/Rf607V3bAPBU23O2SvJacZY+wko8utT+AU9hYqX55Enrh133vtFOQvTZfveq9T6IFQN5VlF72x1
m7mDZVXwaRRJwecyiw9GtunNAU4ui5LaexV+6nXtzKxgM3LIiooJl81/JCjf4PEZuPkTq87/pUwD
xdDToXAizO5h3RL8yp39c8Muxx7jXtXNAp/hg5+DPevF93TSn2h9NHDARY9ZlkFiFGPR0rVYTrwQ
h31kd9YQTVUDjn1zNSN6IEFQVUECgYEA9epnQXA0ivBY5lAhImhEjejDvguGggUdAeWIZTT+ki+X
erRk2bwlm1PtWiBmwCSRrWj0a7PEoVfecBIA/j/GNl1qJAhPa9QYQ8ggt8TY38uqWMjdfEyThgS0
Vb71B3fq2Xo98BjvfCqJo/xjM+q6raS5KOHISFS5WH5r7RCBNE0CgYEAs2YJIBPN1BOJqGqXOboR
NaIbPQZofADPCQ7FEDlvZmDFy98J+dpzMkIn9lUl63mX9WMSpmwtnd3nQ8wrs7r0qElwzNdw4Ooc
kaH+IOzAt+LmkLI+UE5LFW7zFL6wYm7wiOI/FgNgbQez9qxKLuut0TsXeA7fyhmKZg/UZW7l36kC
gYA1+SyQgEAH/piEdDHRi3EAdIYBwCXVg6nKMMau7+Kv0yI8HDvGTjUy0kjV7yaeJWiT1uVOfjY5
8z8u+cSeCQFIDViub+R+lh59Qf9sVhgDhn/s3KlADs6SK5Yo+7Br4zX4ZYwSlmZ5qhxrkYl0a6Bt
XCoHfwamWXIUqiql7WluQQKBgE4XbIF6HW7j0lhtjcajKDqghhraX0EbWQQoWb/mQIfgODm2rTEF
1n9aLOsdxZPrKiq3Jbcr/+9oWPM6PQvPphBbZ67DWW+OeUErsuPCK2Hgc10pOdbbPfPmiAnPuBgh
ErODSNLcRW0wnTYTaXdjQBaEEoNAdkoTNBuZaGt/CrGBAoGBANbkl3if8GUEXGxnySmPCzw8TF3K
tJMTSGNXuJQYdJ4HWrnWBi+zkXiapkJptOp6jRPJXbsv9ETDqvWHiFfhgGtJt8bPlFSQ/3idde+D
krsrOLSX0Kr0fUMsLpAiu53fvODa5rpgF8eafcCKGm4zMTfrXPV3x9wdd/yYMhUfhG6f
-----END RSA PRIVATE KEY-----
