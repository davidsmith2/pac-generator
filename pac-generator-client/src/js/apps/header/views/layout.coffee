Marionette = require 'marionette'

class LayoutView extends Marionette.LayoutView
    template: require './templates/layout.hbs'
    className: 'page-header row no-gutter'

module.exports = LayoutView
