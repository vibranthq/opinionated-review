FROM vvakame/review:3.1

ENV CI true

WORKDIR /app

# prh
RUN git clone https://github.com/prh/rules.git prh-rules

# review
COPY Gemfile /app/
RUN bundle install

# opinionated-review
COPY package.json /app/
RUN yarn && yarn link
COPY src /app/src

# assets
COPY assets /app/assets

# theme
COPY themes /app/themes

ENTRYPOINT ["opinionated-review"]
