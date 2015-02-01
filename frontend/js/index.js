var Backbone = require('backbone');
Backbone.$ = require('jquery');

var Marionette = require('marionette');

var App = new Marionette.Application();

App.addRegions({
    alertRegion: '#alert-region',
    navRegion: '#nav-region',
    modalRegion: '#modal-region'
});

App.addInitializer(function () {
    require('./apps/nav/app')(App);
});

App.start();

App.on('start', function () {
    Backbone.history.start();
});
