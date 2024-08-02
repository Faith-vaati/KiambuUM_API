FROM node:lts-slim

WORKDIR /usr/src/app
COPY package*.json ./
COPY . ./

RUN npm install --silent


EXPOSE 3003
CMD [ "node", "src/index.js" ]
