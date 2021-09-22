FROM ruby:3.0.2
MAINTAINER Albert Marquès Triay
RUN printf "deb [trusted=yes] http://archive.debian.org/debian/ jessie main\ndeb-src http://archive.debian.org/debian/ jessie main\ndeb http://security.debian.org jessie/updates main\ndeb-src http://security.debian.org jessie/updates main" > /etc/apt/sources.list


RUN apt-get update -qq && apt-get install -y sqlite yarn

WORKDIR /app
COPY package.json ./

RUN npm install
RUN bundle install
RUN bundle exec rake webpacker:install
RUN bundle exec rake webpacker:install:react
RUN yarn add antd react-router-dom
COPY . .
CMD [ "npm", "start" ]
