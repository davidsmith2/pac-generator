var express = require('express');
var mongoose = require('mongoose');
var _ = require('underscore');

var User = require('../../models/User');

var findUser = function (req, res, next, userId) {
    var query = User.findOne({uuid: userId});
    query.exec(function (err, user) {
        if (err || !user) {
            res.json({});
        }
        req.user = user;
        return next();
    });
};

module.exports = function (app) {

    var userRouter = express.Router();
    var proxyRouter = express.Router({mergeParams: true});
    var ruleRouter = express.Router({mergeParams: true});
    var exceptionRouter = express.Router({mergeParams: true});

    app.use('/api/users', userRouter);
    userRouter.use('/:userId/proxies', proxyRouter);
    userRouter.use('/:userId/rules', ruleRouter);
    userRouter.use('/:userId/exceptions', exceptionRouter);

    userRouter.route('/')
        .get(function (req, res) {
            var query = User.find();
            query.exec(function (err, users) {
                if (err || !users) {
                    return res.json([]);
                }
                res.json(users);
            });
        });

    userRouter.route('/:userId')
        .get(function (req, res) {
            return res.json(req.user);
        });

    userRouter.param('userId', findUser);

    proxyRouter.route('/')
        .get(function (req, res) {
            if (req.query.action === 'publish') {
                _.each(req.user.proxies, function (proxy) {
                    req.user.writePAC(proxy);
                });
            }
            res.json(req.user.proxies);
        })
        .post(function (req, res) {
            var proxy = req.user.proxies.create(req.body);
            req.user.proxies.push(proxy);
            req.user.save(function (err, user) {
                if (err) {
                    return res.json([]);
                }
                res.json(proxy);
            });
        })
        .delete(function (req, res) {
            req.user.proxies = [];
            req.user.save(function (err, user) {
                if (err) {
                    return res.json([]);
                }
                res.json(user.proxies);
            });
        });

    proxyRouter.route('/:proxyId')
        .get(function (req, res) {
            var proxy = req.user.proxies.id(req.params.proxyId);
            if (!proxy) {
                return res.json({});
            }
            if (req.query.action === 'publish') {
                req.user.writePAC(proxy);
            }
            res.json(proxy);
        })
        .put(function (req, res) {
            var proxy = req.user.proxies.id(req.params.proxyId);
            if (!proxy) {
                return res.json({});
            }
            proxy = _.extend(proxy, req.body);
            req.user.save(function (err, user) {
                if (err) {
                    return res.json({});
                }
                res.json(proxy);
            });
        })
        .delete(function (req, res) {
            var proxy = req.user.proxies.id(req.params.proxyId);
            req.user.proxies = _.reject(req.user.proxies, function (obj) {
                return _.isEqual(obj, proxy);
            });
            req.user.save(function (err, user) {
                if (err) {
                    return res.json({});
                }
                res.json(req.user.proxies);
            });
        });

    proxyRouter.param('userId', findUser);

    ruleRouter.route('/')
        .get(function (req, res) {
            res.json(req.user.rules);
        })
        .post(function (req, res) {
            var rule = req.user.rules.create(req.body);
            req.user.rules.push(rule);
            req.user.save(function (err, user) {
                if (err) {
                    return res.json([]);
                }
                res.json(rule);
            });
        })
        .delete(function (req, res) {
            req.user.rules = [];
            req.user.save(function (err, user) {
                if (err) {
                    return res.json([]);
                }
                res.json(user.rules);
            });
        });

    ruleRouter.route('/:ruleId')
        .get(function (req, res) {
            var rule = req.user.rules.id(req.params.ruleId);
            if (!rule) {
                return res.json({});
            }
            res.json(rule);
        })
        .put(function (req, res) {
            var rule = req.user.rules.id(req.params.ruleId);
            if (!rule) {
                return res.json({});
            }
            rule = _.extend(rule, req.body);
            req.user.save(function (err, user) {
                if (err) {
                    return res.json({});
                }
                res.json(rule);
            });
        })
        .delete(function (req, res) {
            var rule = req.user.rules.id(req.params.ruleId);
            req.user.rules = _.reject(req.user.rules, function (obj) {
                return _.isEqual(obj, rule);
            });
            req.user.save(function (err, user) {
                if (err) {
                    return res.json({});
                }
                res.json(req.user.rules);
            });
        });

    ruleRouter.param('userId', findUser);

    exceptionRouter.route('/')
        .get(function (req, res) {
            res.json(req.user.exceptions);
        })
        .post(function (req, res) {
            var exception = req.user.exceptions.create(req.body);
            req.user.exceptions.push(exception);
            req.user.save(function (err, user) {
                if (err) {
                    return res.json([]);
                }
                res.json(exception);
            });
        })
        .delete(function (req, res) {
            req.user.exceptions = [];
            req.user.save(function (err, user) {
                if (err) {
                    return res.json([]);
                }
                res.json(user.exceptions);
            });
        });

    exceptionRouter.route('/:exceptionId')
        .get(function (req, res) {
            var exception = req.user.exceptions.id(req.params.exceptionId);
            if (!exception) {
                return res.json({});
            }
            res.json(exception);
        })
        .put(function (req, res) {
            var exception = req.user.exceptions.id(req.params.exceptionId);
            if (!exception) {
                return res.json({});
            }
            exception = _.extend(exception, req.body);
            req.user.save(function (err, user) {
                if (err) {
                    return res.json({});
                }
                res.json(exception);
            });
        })
        .delete(function (req, res) {
            var exception = req.user.exceptions.id(req.params.exceptionId);
            req.user.exceptions = _.reject(req.user.exceptions, function (obj) {
                return _.isEqual(obj, exception);
            });
            req.user.save(function (err, user) {
                if (err) {
                    return res.json({});
                }
                res.json(req.user.exceptions);
            });
        });

    exceptionRouter.param('userId', findUser);

};
