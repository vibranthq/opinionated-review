FROM vvakame/review:3.1

ENV CI true

WORKDIR /app

# prh
RUN git clone https://github.com/prh/rules.git prh-rules

# kindlegen
RUN curl -sL https://kindlegen.s3.amazonaws.com/kindlegen_linux_2.6_i386_v2_9.tar.gz -o /tmp/kindlegen.tar.gz
RUN tar -zxf /tmp/kindlegen.tar.gz -C /tmp && cp /tmp/kindlegen /usr/local/bin/kindlegen

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
