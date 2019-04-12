IMAGE = vibranthq/opinionated-review
INDIR = ${CURDIR}/../articles
OUTDIR = ${CURDIR}/../dist

default: build

build:
	docker build -t ${IMAGE} .

test: build
	docker run -it --rm -v ${INDIR}:/in -v ${OUTDIR}:/out ${IMAGE}

test-lint: build
	docker run -it --rm -v ${INDIR}:/in ${IMAGE} lint

publish: build test test-lint
	docker push vibranthq/opinionated-review

dive: build
	docker run --rm -it -v ${INDIR}:/in -v ${OUTDIR}:/out --entrypoint bash ${IMAGE}
