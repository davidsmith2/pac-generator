FROM node:0.10

ENV HOME=/home/app

COPY package.json npm-shrinkwrap.json $HOME/pac-generator/

WORKDIR $HOME/pac-generator

RUN npm install -g grunt-cli@0.1 && npm install

COPY . $HOME/pac-generator

EXPOSE 8081

CMD grunt
