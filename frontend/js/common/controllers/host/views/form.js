var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');

module.exports = Marionette.ItemView.extend({
    template: require('./templates/form.hbs'),
    tagName: 'form',
    className: 'form-horizontal'
});
