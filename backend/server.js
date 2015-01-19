var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();

var init = function () {
    var proxies = require('../data/proxies');
    writeFiles(proxies);
};

var writeFiles = function (proxies) {
    for (var i = 0; i < proxies.length; i++) {
        writeFile(proxies[i], onWriteFile);
    }
};

var writeFile = function (proxy, next) {
    var mkdirp = require('mkdirp');
    var dirp = './downloads/' + proxy.name.toLowerCase();
    mkdirp(dirp, function (err) {
        var data;
        if (err) {
            return console.log(err);
        }
        data = require('../data/pac')(proxy);
        fs.writeFile(dirp + '/proxy.pac', data, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log('PAC file created for ' + proxy.name + ' proxy');
            next(proxy);
        });
    });
};

var onWriteFile = function (proxy) {
    testFile(proxy.name, 5);
};

var testFile = function (proxyName, maxTries) {
    var handleError = function () {
        if (maxTries > 0) {
            maxTries--;
            console.log('Trying to find PAC file for ' + proxyName + ' proxy. Tries left: ' + maxTries + '.');
            testFile(proxyName, maxTries);
        } else {
            return console.log('PAC file not found for ' + proxyName + ' proxy');
        }
    };
    var handleTest = function () {
        console.log('Running test on PAC file for ' + proxyName + ' proxy');
        var PythonShell = require('python-shell');
        var script = 'test.py';
        var options = {scriptPath: './'};
        var callback = function (err) {
            if (err) {
                throw err;
            }
            return console.log('Test successful on PAC file for ' + proxyName + ' proxy');
        };
        PythonShell.run(script, options, callback);
    };
    setTimeout(function () {
        var path = 'downloads/' + proxyName.toLowerCase() + '/proxy.pac';
        fs.open(path, 'r', function (err) {
            if (err) {
                handleError();
            } else {
                handleTest();
            }
        });
    }, 1000);
};

app.use(require('connect-livereload')({
    port: 35729
}));

app.use('/downloads', express.static(path.join(__dirname, '../downloads')));

app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
    res.render('index.jade', {
        title: 'PAC Files'
    });
});

http.createServer(app).listen(3000, init);

module.exports = app;