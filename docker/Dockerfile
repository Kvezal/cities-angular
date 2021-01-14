### STAGE 1: Build ###
FROM node:14.15.4-alpine3.10 AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod


### STAGE 2: Run ###
FROM nginx:1.17.1-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/dist/cities-angular /usr/share/nginx/html
