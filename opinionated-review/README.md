# opinionated-review/cli

## Test

```
make test-pdf
make test-pdf-ebook
make test-epub
make test-kindle
make test-lint
```

## Update Version

Rewrite `Makefile`:

```
IMAGE = vibranthq/opinionated-review:<new-version>
```

then:

```
make publish
git add .
git commit -am 'chore: version bump v<new-version>'
git tag v<new-version> -m 'v<new-version>'
git push
```
