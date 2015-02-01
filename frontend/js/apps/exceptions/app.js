var Backbone = require('Backbone');
var Marionette = require('Marionette');
var $ = require('jquery');
var _ = require('underscore');

module.exports = function (App) {
    App.module('ExceptionsApp', function (ExceptionsApp, App, Backbone, Marionette, $, _) {
        ExceptionsApp.on('start', function () {
            console.log(this.moduleName + ' started');
            require('./router')(App);
        });
        ExceptionsApp.on('stop', function () {
            console.log(this.moduleName + ' stopped');
        });
    });
};