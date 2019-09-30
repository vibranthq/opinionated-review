IMAGE = vibranthq/opinionated-review:latest
SOURCE_DIR = ${CURDIR}/articles
DIST_DIR = ${CURDIR}/dist
PRESS_READY_DIST = ReVIEW-Template-press-ready.pdf

PDF_FILE := $(firstword $(wildcard dist/*.pdf))

default: pdf
release: pdf press-ready

clean:
	rm dist/*

pdf:
	docker run -it --rm \
		-v ${SOURCE_DIR}:/in \
		-v ${DIST_DIR}:/out \
		${IMAGE} \
		pdf

epub:
	docker run -it --rm \
		-v ${SOURCE_DIR}:/in \
		-v ${DIST_DIR}:/out \
		${IMAGE} \
		epub

lint:
	docker run -it --rm \
		-v ${SOURCE_DIR}:/in \
		-v ${DIST_DIR}:/out \
		${IMAGE} \
		lint

lint-pdf: pdf
	docker run --rm -it \
		-v ${DIST_DIR}:/workdir \
		vibranthq/press-ready lint \
		--input ./$(shell basename ${PDF_FILE})

press-ready: pdf
	docker run --rm -it \
		-v ${DIST_DIR}:/workdir \
		vibranthq/press-ready \
		--input ./$(shell basename ${PDF_FILE}) \
		--output ./${PRESS_READY_DIST}
