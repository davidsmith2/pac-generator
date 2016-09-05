# Base images
FROM node:0.10

# Add user for app
RUN useradd --user-group --create-home --shell /bin/false app

# Env variable for app home
ENV HOME=/home/app

# Copy packaging files to container
COPY package.json npm-shrinkwrap.json $HOME/pac-generator/

# Grant ownership of home dir to app user
RUN chown -R app:app $HOME/*

# Define working dir
WORKDIR $HOME/pac-generator

# Switch user to root
USER root

# Install Grunt CLI
RUN npm install -g grunt-cli@0.1 && npm install

# Copy app source to container
COPY . $HOME/pac-generator

# Switch user to app
USER app

# Expose ports
EXPOSE 8081

# Run grunt
CMD grunt
