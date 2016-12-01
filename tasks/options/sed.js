var grunt = require('grunt');

var tag = grunt.option('SHA1');

module.exports = {
	predeploy: {
		path: './Dockerrun.aws.json',
		pattern: '{tag}',
		replacement: tag
	}
};