# PAC Generator

[![Build Status](https://api.travis-ci.org/davidsmith2/pac-generator.svg)](https://travis-ci.org/davidsmith2/pac-generator)

PAC Generator is a data-driven proxy auto-config file generator.

## Local environment setup

In order to run the app in Mac you'll need:

* OS X 10.10.3 or newer
* Docker for Mac
* Git

You can check version numbers from Terminal with:

* OS X: `sw_vers -productVersion`
* Docker: `docker --version && docker-compose --version && docker-machine --version`
* Git: `git --version`

Then to run the app:

* Clone Git repo: `git clone https://github.com/davidsmith2/pac-generator.git`
* Copy Git hooks: `cd pac-generator && cp hooks/pre-commit .git/hooks`
* Build Docker image: `docker build -t davidsmith2/pac-generator .`
* Run Docker image: `docker run -v ${pwd}:/usr/src/app -p 8081:8081 -p 35729:35729 -d davidsmith2/pac-generator`
* Open app in browser: `localhost:8081`

## Docker commands

To remove untagged images:

```
docker rmi $(docker images -q --filter "dangling=true")
```

To remove stopped containers:

```
docker rm $(docker ps -a -q)
```

To push the build to Docker Hub:

```
docker tag ${IMAGE_ID} davidsmith2/pac-generator:${COMMIT}
docker login -e ${EMAIL} -u ${USERNAME} -p ${PASSWORD}
docker push davidsmith2/pac-generator:${COMMIT}
```
