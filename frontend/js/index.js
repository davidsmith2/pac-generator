var Backbone = require('backbone');
Backbone.$ = require('jquery');

var Marionette = require('marionette');

var App = new Marionette.Application();

App.addRegions({
    proxiesRegion: '#proxies-region',
    exceptionsRegion: '#exceptions-region',
    rulesRegion: '#rules-region',
    modalRegion: '#modal-region'
});

App.addInitializer(function () {

    var HostController = require('./controllers/host')(this);
    var ProxyController = require('./controllers/proxy')(this);

    // exceptions
    var Exceptions = require('./entities/exceptions');
    var Exception = require('./entities/exception');
    var exceptionController = new HostController({
        collection: new Exceptions(),
        Model: Exception,
        region: App.exceptionsRegion,
        compositeViewTitle: 'Exceptions',
        modalTitles: {
            create: 'Create exception',
            edit: 'Edit exception'
        }
    });
    exceptionController.index();

    // rules
    var Rules = require('./entities/rules');
    var Rule = require('./entities/rule');
    var ruleController = new HostController({
        collection: new Rules(),
        Model: Rule,
        region: App.rulesRegion,
        compositeViewTitle: 'Rules',
        modalTitles: {
            create: 'Create rule',
            edit: 'Edit rule'
        }
    });
    ruleController.index();

    // proxies
    var Proxies = require('./entities/proxies');
    var proxyController = new ProxyController({
        collection: new Proxies()
    });
    proxyController.index();

});

App.start();

App.on('start', function () {
    Backbone.history.start();
});
