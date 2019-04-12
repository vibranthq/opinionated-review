IMAGE = vibranthq/opinionated-review
INDIR = ${CURDIR}/../articles
OUTDIR = ${CURDIR}/../dist

default: build
release: build test publish

build:
	docker build -t ${IMAGE} .

test:
	docker run -it --rm -v ${INDIR}:/in -v ${OUTDIR}:/out ${IMAGE}

test-lint:
	docker run -it --rm -v ${INDIR}:/in ${IMAGE} lint

publish:
	docker push vibranthq/opinionated-review

dive:
	docker run --rm -it -v ${INDIR}:/in -v ${OUTDIR}:/out --entrypoint bash ${IMAGE}
