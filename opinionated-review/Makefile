IMAGE = vibranthq/opinionated-review
INDIR = ${CURDIR}/../articles
OUTDIR = ${CURDIR}/../dist

default: build

build:
	docker build -t ${IMAGE} .

test-pdf: build
	docker run -t --rm -v ${INDIR}:/in -v ${OUTDIR}:/out ${IMAGE} pdf

test-pdf-ebook: build
	docker run -t --rm -v ${INDIR}:/in -v ${OUTDIR}:/out ${IMAGE} pdf-ebook

test-epub: build
	docker run -t --rm -v ${INDIR}:/in -v ${OUTDIR}:/out ${IMAGE} epub

test-lint: build
	docker run -t --rm -v ${INDIR}:/in ${IMAGE} lint

test: test-pdf test-pdf-ebook test-epub test-lint

publish: build test
	docker push ${IMAGE}

dive: build
	docker run --rm -it -v ${INDIR}:/in -v ${OUTDIR}:/out --entrypoint bash ${IMAGE}
