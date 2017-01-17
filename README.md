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
* Create and start containers: `docker-compose up --build -d`
* Open app in browser: `http://localhost`

## Docker commands

To remove untagged images:

```
docker rmi $(docker images -q --filter "dangling=true")
```

To remove stopped containers:

```
docker rm $(docker ps -a -q)
```

To remove dangling volumes:

```
docker volume rm `docker volume ls -q -f dangling=true`
```
