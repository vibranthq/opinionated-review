FROM vvakame/review:5.1

ENV CI true

WORKDIR /app

# prh
RUN git clone https://github.com/prh/rules.git prh-rules

# review
COPY Gemfile Gemfile.lock /app/
RUN bundle install --deployment

# opinionated-review
COPY package.json yarn.lock /app/
RUN yarn --production --frozen-lockfile && yarn link
COPY src /app/src

# assets
COPY assets /app/assets

# theme
COPY themes /app/themes

ENTRYPOINT ["opinionated-review"]
