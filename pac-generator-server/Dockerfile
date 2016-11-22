FROM node:0.10

ENV HOME=/home/app

COPY package.json $HOME/pac-generator/

WORKDIR $HOME/pac-generator

RUN npm install

ADD . $HOME/pac-generator

CMD ["npm", "start"]
