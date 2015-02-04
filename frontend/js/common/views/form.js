var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');

var SaveBehavior = require('../behaviors/SaveBehavior');

module.exports = Marionette.ItemView.extend({
    tagName: 'form',
    className: 'form-horizontal',
    behaviors: {
        SaveBehavior: {
            behaviorClass: SaveBehavior,
            fieldSelector: '.form-control'
        }
    },
    save: function () {
        this.trigger('save');
    }
});
