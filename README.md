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
* Build Docker image: `docker build -t pac-generator .`
* Run Docker image: `docker run -p 49161:8081 -d pac-generator`
* Open app in browser: `localhost:49161`
