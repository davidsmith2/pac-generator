var mongoose = require('mongoose'),
    Proxy = require('../../models/Proxy'),
    Exception = require('../../models/Exception'),
    Rule = require('../../models/Rule');

module.exports = function (server, bodyParser) {
    //var jsonParser = bodyParser.json();
    var urlencodedParser = bodyParser.urlencoded({extended: false});
    server.get('/api/proxies', function (req, res, next) {
        Proxy.find(function (err, proxies) {
            if (err) {
                return next(err);
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
    server.put('/api/proxies/:proxy', urlencodedParser, function (req, res, next) {
        return req.proxy.save(function (err, proxy) {
            if (err) {
                return next(err);
            }
            return res.send(proxy);
        });
    });
    server.delete('/api/proxies/:proxy', function (req, res, next) {
        req.proxy.remove(function (err, proxy) {
            if (err) {
                return next(err);
            }
            res.send('proxy deleted');
        });
    });
    server.get('/api/exceptions', function (req, res, next) {
        Exception.find(function (err, exceptions) {
            if (err) {
                return next(err);
            }
            res.json(exceptions);
        });
    });
    server.post('/api/exceptions', urlencodedParser, function (req, res, next) {
        var exception = new Exception(req.body);
        exception.save(function (err, exception) {
            if (err) {
                return next(err);
            }
            res.json(exception);
        });
    });
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
};
