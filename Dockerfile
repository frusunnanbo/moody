FROM node:14 as build-deps

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json yarn.lock ./

RUN yarn
COPY . ./
RUN yarn build

FROM node:14
COPY --from=build-deps /usr/src/app/build /usr/src/app

RUN yarn global add serve
EXPOSE 5000
CMD [ "serve", "-s","/usr/src/app" ]