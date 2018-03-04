'use strict';

const readYaml = require('read-yaml');
const _ = require('underscore');

const dockerCommands = {
	tag(image, tag) {
		return `docker tag ${image.name} davidsmith2/${image.containerName}:${tag}`;
	},
	push(image, tag) {
		return `docker push davidsmith2/${image.containerName}:${tag}`;
	}
};

const getShellCommandsByDockerCommand = (dockerCommand, images, tag) => {
	let shellCommmands = '';
	for (let image of images) {
		shellCommmands += `${dockerCommands[dockerCommand](image, tag)}\n`;
	}
	return shellCommmands;
};

const getShellCommands = (tag, images) => {
	let shellCommmands = '';
	shellCommmands += getShellCommandsByDockerCommand('tag', images, tag);
	shellCommmands += getShellCommandsByDockerCommand('tag', images, 'newest');
	shellCommmands += getShellCommandsByDockerCommand('push', images, tag);
	shellCommmands += getShellCommandsByDockerCommand('push', images, 'newest');
	return shellCommmands;
};

const getImages = (config) => {
	let images = [];
	for (let service in config.services) {
		if (config.services.hasOwnProperty(service)) {
      images.push({
        name: 'pacgenerator_' + service,
        containerName: config.services[service].container_name
      });
		}
	}
	return images;
};

module.exports = {
	predeploy: {
		cmd: _.wrap(getShellCommands, (func, tag, configFilename) => {
			return func(tag, getImages(readYaml.sync(configFilename)));
		})
	}
};
