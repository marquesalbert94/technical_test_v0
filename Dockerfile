FROM ruby:3.0.2
MAINTAINER Albert Marquès Triay

RUN apt-get -y update -qq && apt-get install -y sqlite3 libsqlite3-dev yarn

RUN mkdir /app

WORKDIR /app
COPY Gemfile* package.json yarn.lock /app/



COPY . /app

RUN bundle install
RUN bundle exec rails webpacker:compile
EXPOSE 3000
CMD [ "npm", "start" ]
