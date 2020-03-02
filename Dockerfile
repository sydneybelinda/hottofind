FROM node:current-slim

RUN mkdir /app
WORKDIR /app
COPY package*.json .
COPY config.js .
COPY ./config/config.json ./config/config.json

RUN yarn

EXPOSE 3000
EXPOSE 3306
CMD [ "yarn", "dev" ]
