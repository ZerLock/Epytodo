FROM node:16.14.2-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

# Environment variables
ENV PORT 3000
ENV MYSQL_HOST localhost
ENV MYSQL_USER root
ENV MYSQL_PASSWORD root
ENV MYSQL_DATABASE epytodo
ENV EPYTODO_SECRET MY_SECRET_KEY

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]

###
# How to run the docker image
###
#
# /!\ Setup database
#
# docker build . -t epytodo:latest
# docker run -p 3000:3000 epytodo:latest
#
###

