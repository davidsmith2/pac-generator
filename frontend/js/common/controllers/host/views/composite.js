var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');

var childView = require('./tableRow');

module.exports = Marionette.CompositeView.extend({
    template: require('./templates/composite.hbs'),
    childView: childView,
    childViewContainer: 'table',
    triggers: {
        'click .js-create': 'create'
    }
});
