FROM node:10.14.1-alpine

CMD [ "npm", "run", "start" ]

COPY ./backend/src /app

WORKDIR /app

EXPOSE 8000

RUN apk update && \
    apk --no-cache add --virtual deps build-base python && \
    npm install --only=prod && \
    npm rebuild bcrypt --build-from-source && \
    apk del deps