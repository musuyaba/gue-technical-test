FROM node:18-alpine

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .
COPY .env.example .env
CMD [ "node", "index.js" ]