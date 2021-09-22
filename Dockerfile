FROM ruby:3.0.2
MAINTAINER Albert Marquès Triay
RUN apk add --update sqlite
RUN apk add --update yarn

WORKDIR /app
COPY package.json ./

RUN npm install
RUN bundle install
RUN bundle exec rake webpacker:install
RUN bundle exec rake webpacker:install:react
RUN yarn add antd react-router-dom
COPY . .
CMD [ "npm", "start" ]
