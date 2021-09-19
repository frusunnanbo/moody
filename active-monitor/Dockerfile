FROM node:14 as build-deps

# Create app directory
WORKDIR /usr/src/app

# Install frontend app dependencies
COPY package.json yarn.lock ./
RUN yarn
COPY . ./

EXPOSE 8081
CMD [ "node","/usr/src/app/server.js" ]