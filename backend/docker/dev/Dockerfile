FROM node:10.14.1-alpine

CMD [ "npm", "run", "start" ]

COPY ./src /app

WORKDIR /app

RUN apk update && \
    apk --no-cache add --virtual deps build-base python && \
    npm install && \
    npm rebuild bcrypt --build-from-source && \
    apk del deps