FROM node:latest
MAINTAINER Rodolfo Saturnino
COPY /products-microservice /var/www
WORKDIR /var/www
RUN npm install
ENTRYPOINT npm run dev
EXPOSE 8086