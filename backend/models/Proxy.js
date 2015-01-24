var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProxySchema = new Schema({
    name: String,
    port: String
});

ProxySchema.methods.write = function () {
    var mkdirp = require('mkdirp');
    var dirp = './build/pac/' + this.name.toLowerCase();
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

ProxySchema.methods.test = function (maxTries) {
    var self = this;
    var handleError = function () {
        if (maxTries > 0) {
            maxTries--;
            console.log('Trying to find PAC file for ' + self.name + ' proxy. Tries left: ' + maxTries + '.');
            self.test(maxTries);
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
                handleError();
            } else {
                handleTest();
            }
        });
    }, 1000);
};

module.exports = mongoose.model('Proxy', ProxySchema);
