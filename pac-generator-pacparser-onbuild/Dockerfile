FROM python:3.6

ENV HOME=/usr/src/app

RUN mkdir -p $HOME

WORKDIR $HOME

ONBUILD RUN apt-get update && \
	apt-get install -y curl && \
	curl -L https://github.com/pacparser/pacparser/releases/download/1.3.7/pacparser-1.3.7.tar.gz | tar zx

ONBUILD WORKDIR $HOME/pacparser-1.3.7

ONBUILD RUN rm $HOME/pacparser-1.3.7/tests/testdata && ls  -al $HOME/pacparser-1.3.7/tests

#ONBUILD COPY testdata $HOME/pacparser-1.3.7/tests/testdata

ONBUILD RUN make -C src pymod && make -C src install-pymod
