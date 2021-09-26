FROM ruby:3.0.2
MAINTAINER Albert Marquès Triay

RUN apt-get -y update -qq && apt-get install -y sqlite3 libsqlite3-dev yarn nodejs

RUN mkdir /app

WORKDIR /app
COPY Gemfile* package.json yarn.lock /app/

ADD Gemfile /app/
ADD Gemfile.lock /app/
RUN bundle install

COPY . /app



EXPOSE 3000
CMD [ "npm", "start" ]
