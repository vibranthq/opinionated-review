FROM vvakame/review:3.1

ENV CI true
ENV PATH /app:$PATH
ENV REVIEW_CONFIG_FILE config.yml

# review
WORKDIR /app
COPY sources/* /app/
RUN yarn && bundle install

# prh
RUN git clone https://github.com/prh/rules.git prh-rules

# theme
COPY themes /app/themes

CMD ["generate-pdf"]
