var Backbone = require('Backbone');
var Marionette = require('Marionette');
var $ = require('jquery');
var _ = require('underscore');

module.exports = function (App) {
    App.module('ProxiesApp', function (ProxiesApp, App, Backbone, Marionette, $, _) {
        ProxiesApp.startWithParent = false;
        ProxiesApp.on('start', function () {
            console.log(this.moduleName + ' started');
            require('./router')(App);
        });
        ProxiesApp.on('stop', function () {
            console.log(this.moduleName + ' stopped');
        });
    });
    return App.ProxiesApp;
};