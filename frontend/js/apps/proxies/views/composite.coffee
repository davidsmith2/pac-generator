Marionette = require 'marionette'
$ = require 'jquery'
require 'bootstrap'

class CompositeView extends Marionette.CompositeView
    template: require './templates/composite.hbs'
    childView: require './tableRow'
    childViewContainer: 'table'
    triggers:
        'click .js-create': 'create'
    onRender: () =>
        this.$('[data-toggle=tooltip]').tooltip()


module.exports = CompositeView