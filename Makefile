IMAGE = vibranthq/opinionated-review
SOURCE_DIR = ${CURDIR}/articles
DIST_DIR = ${CURDIR}/dist
PRESS_READY_SOURCE = ReVIEW-Template.pdf
PRESS_READY_DIST = ReVIEW-Template-press-ready.pdf

default: pdf
release: pdf press-ready

pdf:
	docker run -it --rm \
	-v ${SOURCE_DIR}:/in \
	-v ${DIST_DIR}:/out \
	${IMAGE}

lint: pdf
	docker run --rm -it \
	-v ${DIST_DIR}:/workdir \
	vibranthq/press-ready lint \
	--input ./${PRESS_READY_SOURCE}

press-ready: pdf
	docker run --rm -it \
	-v ${DIST_DIR}:/workdir \
	vibranthq/press-ready \
	--input ./${PRESS_READY_SOURCE} \
	--output ./${PRESS_READY_DIST}
