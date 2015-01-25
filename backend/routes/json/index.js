var mongoose = require('mongoose');
var Proxy = require('../../models/Proxy');
var Exception = require('../../models/Exception');
var Rule = require('../../models/Rule');
var _ = require('underscore');

module.exports = function (server, bodyParser) {

    // proxies

    server.get('/api/proxies', function (req, res, next) {
        Proxy.find(function (err, proxies) {
            if (err) {
                return next(err);
            }
            res.json(proxies);
        });
    });
    server.post('/api/proxies', bodyParser, function (req, res, next) {
        var proxy = new Proxy(req.body);
        proxy.save(function (err, proxy) {
            if (err) {
                return next(err);
            }
            res.json(proxy);
        });
    });
    server.get('/api/proxies/:proxy', function (req, res) {
        res.json(req.proxy);
    });
    server.put('/api/proxies/:proxy', bodyParser, function (req, res, next) {
        req.proxy.set(req.body);
        req.proxy.save(function (err, proxy) {
            if (err) {
                return next(err);
            }
            return res.json(proxy);
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
    server.get('/api/proxies/:proxy/publish', function (req, res) {
        req.proxy.exceptions = [];
        req.proxy.rules = [];
        Exception.find(function (err, exceptions) {
            for (var i = 0; i < exceptions.length; i++) {
                req.proxy.exceptions.push(exceptions[i]);
            }
            Rule.find(function (err, rules) {
                for (var i = 0; i < rules.length; i++) {
                    req.proxy.rules.push(rules[i]);
                }
                req.proxy.writePAC(function (pac) {
                    res.send(pac);
                });
            });
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
    server.post('/api/exceptions', bodyParser, function (req, res, next) {
        var exception = new Exception(req.body);
        exception.save(function (err, exception) {
            if (err) {
                return next(err);
            }
            res.json(exception);
        });
    });
    server.get('/api/exceptions/:exception', bodyParser, function (req, res, next) {
        res.json(req.exception);
    });
    server.put('/api/exceptions/:exception', bodyParser, function (req, res, next) {
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
    server.post('/api/rules', bodyParser, function (req, res, next) {
        var rule = new Rule(req.body);
        rule.save(function (err, rule) {
            if (err) {
                return next(err);
            }
            res.json(rule);
        });
    });
    server.get('/api/rules/:rule', bodyParser, function (req, res, next) {
        res.json(req.rule);
    });
    server.put('/api/rules/:rule', bodyParser, function (req, res, next) {
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
