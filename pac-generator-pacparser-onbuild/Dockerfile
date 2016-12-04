FROM python:3.6

ARG isNotResolvableDomainExpectedResult

ENV HOME=/usr/src/app

RUN mkdir -p $HOME

WORKDIR $HOME

RUN apt-get update && apt-get install -y \
	curl \
	sed

RUN	curl -L https://github.com/pacparser/pacparser/releases/download/1.3.7/pacparser-1.3.7.tar.gz | tar zx

WORKDIR $HOME/pacparser-1.3.7

RUN sed -i "s/isNotResolvable/$isNotResolvableDomainExpectedResult/g" tests/testdata

ONBUILD RUN make -C src pymod && make -C src install-pymod