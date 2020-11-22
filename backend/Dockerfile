FROM node:15.0.1-alpine3.12
COPY ./src/ /app
WORKDIR /app
RUN ["yarn", "install"]
CMD ["node", "index.js"]
