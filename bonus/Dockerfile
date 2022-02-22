FROM node:14.18.3-alpine
WORKDIR .
COPY . .
RUN npm install
EXPOSE 8080
ENTRYPOINT ["npm", "start"]