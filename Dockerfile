FROM ruby:3.0.2
MAINTAINER Albert Marquès Triay

RUN apt-get -y update -qq && apt-get install -y sqlite3 libsqlite3-dev yarn nodejs

# Add Yarn repository
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN mkdir /web

WORKDIR /web
COPY Gemfile* package.json yarn.lock /web/

ADD Gemfile /web/
ADD Gemfile.lock /web/
RUN bundle install

COPY . /web



EXPOSE 3000
CMD [ "npm", "start" ]
