FROM node:15.0.1-alpine3.12
COPY . /app
WORKDIR /app
RUN ls -lah
RUN ["yarn", "install"]
# RUN ["yarn", "build"]
CMD ["node", "index.js"]
