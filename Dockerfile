FROM node:14 as build-deps

# Create app directory
WORKDIR /usr/src/app

# Install frontend app dependencies
COPY package.json yarn.lock ./
RUN yarn
COPY . ./

# build an optimized frontend build
RUN yarn build

WORKDIR /usr/src/app/backend

# Install backend dependencies
ADD backend/server.js backend/package.json backend/yarn.lock ./
RUN yarn

EXPOSE 8080
CMD [ "node","/usr/src/app/backend/server.js" ]