FROM node:8.12-alpine

ENTRYPOINT [ "npm" ]

CMD [ "run", "start" ]

COPY ./src /app

WORKDIR /app

RUN npm install
