const grunt = require('grunt');

const tag = grunt.option('SHA1');

module.exports = {
	predeploy: {
		path: './Dockerrun.aws.json',
		pattern: '{tag}',
		replacement: tag
	}
};