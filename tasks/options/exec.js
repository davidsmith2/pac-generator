'use strict';

var readYaml = require('read-yaml');
var _ = require('underscore');

const dockerCommands = {
	tag(imageName, tag) {
		return `docker tag ${imageName}:${tag}`;
	},
	push(imageName, tag) {
		return `docker push ${imageName}:${tag}`;
	}
};

const getShellCommandsByDockerCommand = (dockerCommand, imageNames, tag) => {
	let shellCommmands = '';
	for (var imageName of imageNames) {
		shellCommmands += `${dockerCommands[dockerCommand](imageName, tag)}\n`;
	}
	return shellCommmands;
};

const getShellCommands = (tag, imageNames) => {
	let shellCommmands = '';
	shellCommmands += getShellCommandsByDockerCommand('tag', imageNames, tag);
	shellCommmands += getShellCommandsByDockerCommand('tag', imageNames, 'newest');
	shellCommmands += getShellCommandsByDockerCommand('push', imageNames, tag);
	shellCommmands += getShellCommandsByDockerCommand('push', imageNames, 'newest');
	return shellCommmands;
};

const getImageNames = (config) => {
	let imageNames = [];
	for (var service in config.services) {
		imageNames.push(config.services[service].image);
	}
	return imageNames;
};

module.exports = {
	predeploy: {
		cmd: _.wrap(getShellCommands, (func, tag, configFilename) => {
			return func(tag, getImageNames(readYaml.sync(configFilename)));
		})
	}
};
