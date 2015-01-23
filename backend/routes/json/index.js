var mongoose = require('mongoose');
var Proxy = require('../../models/Proxy');
var Exception = require('../../models/Exception');
var Rule = require('../../models/Rule');

var writeToFile = function (err, proxy) {
    //proxy.write();
};

module.exports = function (server, bodyParser) {

    var jsonParser = bodyParser.json();

    var urlencodedParser = bodyParser.urlencoded({extended: false});

    // proxies

    server.get('/api/proxies', function (req, res, next) {
        Proxy.find(function (err, proxies) {
            var proxy;
            if (err) {
                return next(err);
            }
            for (var i = 0; i < proxies.length; i++) {
                proxy = proxies[i];
                proxy.populate('exceptions rules', writeToFile);
                if (proxy.name === 'Oak') {
                    proxy.test(5);
                }
            }
            res.json(proxies);
        });
    });
    server.post('/api/proxies', urlencodedParser, function (req, res, next) {
        var proxy = new Proxy(req.body);
        Exception.find(function (err, exceptions) {
            for (var i = 0; i < exceptions.length; i++) {
                proxy.exceptions.push(exceptions[i]);
            }
            Rule.find(function (err, rules) {
                for (var i = 0; i < rules.length; i++) {
                    proxy.rules.push(rules[i]);
                }
                proxy.save(function (err, proxy) {
                    if (err) {
                        return next(err);
                    }
                    res.json(proxy);
                });
            });
        });
    });
    server.get('/api/proxies/:proxy', function (req, res) {
        req.proxy.populate('exceptions rules', function (err, proxy) {
            res.json(req.proxy);
        });
    });
    server.put('/api/proxies/:proxy', jsonParser, function (req, res, next) {
        return req.proxy.save(function (err, proxy) {
            if (err) {
                return next(err);
            }
            return res.send(proxy);
        });
    });
    server['delete']('/api/proxies/:proxy', function (req, res, next) {
        req.proxy.remove(function (err, proxy) {
            if (err) {
                return next(err);
            }
            res.send('proxy deleted');
        });
    });
    server.param('proxy', function (req, res, next, id) {
        var query = Proxy.findById(id);
        query.exec(function (err, proxy) {
            if (err) {
                return next(err);
            }
            if (!proxy) {
                return next(new Error("Can't find proxy"));
            }
            req.proxy = proxy;
            return next();
        });
    });

    // exceptions

    server.get('/api/exceptions', function (req, res, next) {
        Exception.find(function (err, exceptions) {
            if (err) {
                return next(err);
            }
            res.json(exceptions);
        });
    });
    server.post('/api/exceptions', jsonParser, function (req, res, next) {
        var exception = new Exception(req.body);
        exception.save(function (err, exception) {
            if (err) {
                return next(err);
            }
            res.json(exception);
        });
    });
    server.get('/api/exceptions/:exception', jsonParser, function (req, res, next) {
        res.json(req.exception);
    });
    server.put('/api/exceptions/:exception', jsonParser, function (req, res, next) {
        req.exception.set(req.body);
        req.exception.save(function (err, exception) {
            if (err) {
                return next(err);
            }
            res.json(exception);
        });
    });
    server['delete']('/api/exceptions/:exception', function (req, res, next) {
        req.exception.remove(function (err, exception) {
            if (err) {
                return next(err);
            }
            res.json(exception);
        });
    });
    server.param('exception', function (req, res, next, id) {
        var query = Exception.findById(id);
        query.exec(function (err, exception) {
            if (err) {
                return next(err);
            }
            if (!exception) {
                return next(new Error("Can't find exception"));
            }
            req.exception = exception;
            return next();
        });
    });

    // rules

    server.get('/api/rules', function (req, res, next) {
        Rule.find(function (err, rules) {
            if (err) {
                return next(err);
            }
            res.json(rules);
        });
    });
    server.post('/api/rules', urlencodedParser, function (req, res, next) {
        var rule = new Rule(req.body);
        rule.save(function (err, rule) {
            if (err) {
                return next(err);
            }
            res.json(rule);
        });
    });
    server.get('/api/rules/:rule', jsonParser, function (req, res, next) {
        res.json(req.rule);
    });
    server.put('/api/rules/:rule', jsonParser, function (req, res, next) {
        req.rule.set(req.body);
        req.rule.save(function (err, rule) {
            if (err) {
                return next(err);
            }
            res.json(rule);
        });
    });
    server['delete']('/api/rules/:rule', function (req, res, next) {
        req.rule.remove(function (err, rule) {
            if (err) {
                return next(err);
            }
            res.json(rule);
        });
    });
    server.param('rule', function (req, res, next, id) {
        var query = Rule.findById(id);
        query.exec(function (err, rule) {
            if (err) {
                return next(err);
            }
            if (!rule) {
                return next(new Error("Can't find rule"));
            }
            req.rule = rule;
            return next();
        });
    });

};
