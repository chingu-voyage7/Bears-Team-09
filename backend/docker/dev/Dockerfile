FROM node:10.14.1-alpine

ENTRYPOINT [ "npm" ]

CMD [ "run", "start" ]

COPY ./src /app

WORKDIR /app

# RUN apk add --no-cache --virtual .gyp \
#     autoconf \
#     automake \
#     g++ \
#     libpng-dev \
#     libtool \
#     make \
#     nasm \
#     python \
#     git \
#   && npm install \
#   && npm rebuild bcrypt --build-from-source \
#   && apk del .gyp