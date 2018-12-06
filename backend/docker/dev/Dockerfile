FROM node:10.14.1-alpine

ENTRYPOINT [ "npm" ]

CMD [ "run", "start" ]

COPY ./src /app

WORKDIR /app

RUN apk update && \
    apk --no-cache add --virtual builds-deps build-base python && \
    npm install && \
    npm rebuild bcrypt --build-from-source && \
    apk del virtual