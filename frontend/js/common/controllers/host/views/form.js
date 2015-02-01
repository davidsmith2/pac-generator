var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');

module.exports = Marionette.ItemView.extend({
    template: _.template($('.host-form-template').html()),
    tagName: 'form',
    className: 'form-horizontal'
});
