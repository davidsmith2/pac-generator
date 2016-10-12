var mongoose = require('mongoose');
var _ = require('underscore');

var Exception = require('../../models/Exception');
var Proxy = require('../../models/Proxy');
var Rule = require('../../models/Rule');

var publish = function (proxy) {
    proxy.exceptions = [];
    proxy.rules = [];
    Exception.find(function (err, exceptions) {
        for (var i = 0; i < exceptions.length; i++) {
            proxy.exceptions.push(exceptions[i]);
        }
        Rule.find(function (err, rules) {
            for (var i = 0; i < rules.length; i++) {
                proxy.rules.push(rules[i]);
            }
            proxy.writePAC();
        });
    });
};

var filterByCreator = function (collection, userId) {
    return _.filter(collection, function (model) {
        return model._creator && (model._creator._id === userId);
    });
};

module.exports = function (server, bodyParser) {

    // proxies

    server.get('/api/proxies', function (req, res, next) {
        Proxy
            .find()
            .populate('_creator')
            .exec(function (err, proxies) {
                var q = req.query;
                proxies = filterByCreator(proxies, req.user.id);
                if (err) {
                    return next(err);
                }
                if (q.action === 'publish') {
                    for (var i = 0; i < proxies.length; i++) {
                        publish(proxies[i]);
                    }
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
        var q = req.query;
        if (q.action === 'publish') {
            publish(req.proxy);
        }
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
            res.json(proxy);
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

    // rules

    server.get('/api/rules', function (req, res, next) {
        Rule
            .find()
            .populate('_creator')
            .exec(function (err, rules) {
                rules = filterByCreator(rules, req.user.id);
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

    // exceptions

    server.get('/api/exceptions', function (req, res, next) {
        Exception
            .find()
            .populate('_creator')
            .exec(function (err, exceptions) {
                exceptions = filterByCreator(exceptions, req.user.id);
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

};
