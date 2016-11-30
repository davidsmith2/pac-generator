var readYaml = require('read-yaml');
var _ = require('underscore');

var dockerCommands = {
	tag: function (imageName, tag) {
		return 'docker tag ' + ' ' + imageName + ' ' + imageName + ':' + tag;
	},
	push: function (imageName, tag) {
		return 'docker push ' + ' ' + imageName + ':' + tag;
	}
};

var getShellCommandsByDockerCommand = function (dockerCommand, imageNames, tag) {
	var shellCommmands = '';
	for (var i = 0; i < imageNames.length; i++) {
		shellCommmands += dockerCommands[dockerCommand](imageNames[i], tag) + '\n';
	}
	return shellCommmands;
};

var getShellCommands = function (tag, images) {
	var shellCommmands = '';
	shellCommmands += getShellCommandsByDockerCommand('tag', images, tag);
	shellCommmands += getShellCommandsByDockerCommand('tag', images, 'newest');
	shellCommmands += getShellCommandsByDockerCommand('push', images, tag);
	shellCommmands += getShellCommandsByDockerCommand('push', images, 'newest');
	return shellCommmands;
};

var getImageNames = function (config) {
	var imageNames = [];
	for (var service in config.services) {
		imageNames.push(config.services[service].image);
	}
	return imageNames;
};

module.exports = {
	docker: {
		cmd: _.wrap(getShellCommands, function (func, tag, configFilename) {
			return func(tag, getImageNames(readYaml.sync(configFilename)));
		})
	}
};
