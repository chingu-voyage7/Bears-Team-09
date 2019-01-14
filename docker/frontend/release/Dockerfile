FROM node:10.14.1-alpine as build

COPY ./frontend /app

WORKDIR /app

RUN npm install && \
    npm run build && \
    npm run export


FROM nginx:stable-alpine

COPY ./backend/nginx/nginx.conf /etc/nginx/nginx.conf

COPY ./backend/nginx/server.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/out /app
