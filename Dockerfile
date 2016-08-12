# Define from what image we want to build from
FROM node:0.10

# Create the working directory for the application
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install grunt-cli
RUN npm install -g grunt-cli@0.1

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Map ports
EXPOSE 8081
EXPOSE 35729

# Define run command
CMD grunt
