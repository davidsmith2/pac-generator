module.exports = {
	deploy: {
		path: './Dockerrun.aws.json',
		pattern: 'XXX',
		replacement: require('grunt').option('SHA1')
	}
};
