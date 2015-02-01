var Backbone = require('backbone');
Backbone.$ = require('jquery');

var Marionette = require('marionette');

var App = new Marionette.Application();

App.addRegions({
    alertRegion: '#alert-region',
    proxiesRegion: '#proxies-region',
    exceptionsRegion: '#exceptions-region',
    rulesRegion: '#rules-region',
    modalRegion: '#modal-region'
});

App.addInitializer(function () {
    require('./apps/proxies/app')(App);
    require('./apps/rules/app')(App);
    require('./apps/exceptions/app')(App);
});

App.start();

App.on('start', function () {
    Backbone.history.start();
});
