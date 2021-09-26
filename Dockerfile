FROM ruby:3.0.2
MAINTAINER Albert Marquès Triay

RUN apt-get -y update -qq && apt-get install -y sqlite3 libsqlite3-dev yarn nodejs

RUN mkdir /web

WORKDIR /web
COPY Gemfile* package.json yarn.lock /web/

ADD Gemfile /web/
ADD Gemfile.lock /web/
RUN bundle install

COPY . /web



EXPOSE 3000
CMD [ "npm", "start" ]
