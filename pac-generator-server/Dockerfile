FROM node:0.10

ENV HOME=/home/app

COPY package.json $HOME/pac-generator/

WORKDIR $HOME/pac-generator

RUN npm install

COPY . $HOME/pac-generator/

CMD ["npm", "start"]
