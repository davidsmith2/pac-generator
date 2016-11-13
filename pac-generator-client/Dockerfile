FROM nginx

RUN apt-get update && apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_0.10 | bash -

RUN apt-get update && apt-get install -y nodejs

ENV HOME=/home/app

COPY package.json $HOME/pac-generator/

WORKDIR $HOME/pac-generator

RUN npm install

COPY nginx.conf /etc/nginx/nginx.conf
