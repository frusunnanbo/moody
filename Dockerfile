FROM node:14 as build-deps

# Create frontend directory
WORKDIR /usr/src/app/frontend

# Install frontend app dependencies
COPY frontend/package.json frontend/yarn.lock ./
RUN yarn
COPY frontend .

# build an optimized frontend build
ENV REACT_APP_GIT_SHA="$(git rev-parse --short HEAD)"
RUN yarn build

WORKDIR /usr/src/app/backend

# Install backend dependencies
ADD backend/package.json backend/yarn.lock ./
RUN yarn
COPY backend ./

EXPOSE 8080
CMD [ "node","/usr/src/app/backend/server.js" ]