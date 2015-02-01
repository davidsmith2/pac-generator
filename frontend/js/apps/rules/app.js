var Backbone = require('Backbone');
var Marionette = require('Marionette');
var $ = require('jquery');
var _ = require('underscore');

module.exports = function (App) {
    App.module('RulesApp', function (RulesApp, App, Backbone, Marionette, $, _) {
        RulesApp.on('start', function () {
            console.log(this.moduleName + ' started');
            require('./router')(App);
        });
        RulesApp.on('stop', function () {
            console.log(this.moduleName + ' stopped');
        });
    });
};