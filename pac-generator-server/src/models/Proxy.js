var _ = require('underscore');
var fs = require('fs');
var mongoose = require('mongoose');

//var creatorSchema = require('../schemas/creatorSchema');
//var proxySchema = require('../schemas/proxySchema');

var ProxySchema = new mongoose.Schema({
    name: String,
    port: String,
    server: String,
    href: String,
    _creator: {type: String, ref: 'User'}
});

ProxySchema.methods.writePAC = function (user) {
    var mkdirp = require('mkdirp');
    var dirp = './dist/pac/' + user.uuid + '/' + this.id;
    var self = this;
    mkdirp(dirp, function (err) {
        var data;
        if (err) {
            return console.log(err);
        }
        data = require('../templates/pac')(self);
        fs.writeFile(dirp + '/proxy.pac', data, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log('PAC file created for ' + self.name + ' proxy');
        });
    });
};

ProxySchema.methods.testPAC = function (maxTries) {
    var self = this;
    var handleError = function (err) {
        if (maxTries > 0) {
            maxTries--;
            console.log('Trying to find PAC file for ' + self.name + ' proxy. Tries left: ' + maxTries + '.');
            self.testPAC(maxTries);
        } else {
            return console.log('PAC file not found for ' + self.name + ' proxy');
        }
    };
    var handleTest = function () {
        console.log('Running test on PAC file for ' + self.name + ' proxy');
        var PythonShell = require('python-shell');
        var script = 'test.py';
        var options = {scriptPath: './backend/tests'};
        var callback = function (err) {
            if (err) {
                throw err;
            }
            return console.log('Test successful on PAC file for ' + self.name + ' proxy');
        };
        PythonShell.run(script, options, callback);
    };
    setTimeout(function () {
        var path = './build/pac/' + self.name.toLowerCase() + '/proxy.pac';
        fs.open(path, 'r', function (err) {
            if (err) {
                handleError(err);
            } else {
                handleTest();
            }
        });
    }, 1000);
};

module.exports = mongoose.model('Proxy', ProxySchema);
