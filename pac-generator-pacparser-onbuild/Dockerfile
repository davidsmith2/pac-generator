FROM python:3.6

ARG env

RUN echo "environment: $env"

ENV HOME=/usr/src/app

RUN mkdir -p $HOME

WORKDIR $HOME

RUN apt-get update && \
	apt-get install -y curl && \
	curl -L https://github.com/pacparser/pacparser/releases/download/1.3.7/pacparser-1.3.7.tar.gz | tar zx

WORKDIR $HOME/pacparser-1.3.7

RUN rm $HOME/pacparser-1.3.7/tests/testdata

COPY "./${env}/testdata" $HOME/pacparser-1.3.7/tests/testdata

ONBUILD RUN make -C src pymod && make -C src install-pymod
