IMAGE = vibranthq/opinionated-review:2.0
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

test-kindle: build
	docker run -t --rm -v ${INDIR}:/in -v ${OUTDIR}:/out ${IMAGE} kindle

test-lint: build
	docker run -t --rm -v ${INDIR}:/in ${IMAGE} lint

publish: build test-pdf test-epub test-lint
	docker push ${IMAGE}

dive: build
	docker run --rm -it -v ${INDIR}:/in -v ${OUTDIR}:/out --entrypoint bash ${IMAGE}
