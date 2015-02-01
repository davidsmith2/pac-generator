var Backbone = require('Backbone');
var Marionette = require('Marionette');
var $ = require('jquery');
var _ = require('underscore');

module.exports = function (App) {
    App.module('NavApp', function (NavApp, App, Backbone, Marionette, $, _) {
        NavApp.on('start', function () {
            console.log(this.moduleName + ' started');
            var controller = require('./controller')(App);
            controller.show();
        });
        NavApp.on('stop', function () {
            console.log(this.moduleName + ' stopped');
        });
    });
    return App.NavApp;
};