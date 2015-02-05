Marionette = require 'marionette'
require 'bootstrap'

class AlertView extends Marionette.LayoutView
    template: require './templates/alert.hbs'
    className: 'alert'
    regions:
        contentRegion: '.alert-content-region'

module.exports = AlertView;