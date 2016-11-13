Marionette = require 'marionette'

class CompositeView extends Marionette.CompositeView
    template: require './templates/composite.hbs'
    childView: require './tableRow'
    childViewContainer: 'table'
    triggers:
        'click .js-create': 'create'

module.exports = CompositeView