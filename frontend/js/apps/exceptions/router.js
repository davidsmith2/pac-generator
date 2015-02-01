var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');

module.exports = function (App) {
    var controller = require('./controller')(App);
    var Router = Marionette.AppRouter.extend({
        appRoutes: {},
        controller: controller
    });
    controller.index();
    return new Router();
};