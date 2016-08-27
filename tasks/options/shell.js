var grunt = require('grunt');

var SHA1 = grunt.option('SHA1');

module.exports = {
    deploy: {
    	command: 'sed s/XXX/' + SHA1 + '/ < Dockerrun.aws.json.tpl > Dockerrun.aws.json'
    }
};
