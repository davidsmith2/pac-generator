Marionette = require 'marionette'

class ResourceLayoutView extends Marionette.LayoutView
    template: require './templates/resourceLayout.hbs'
    regions:
        headerRegion: '#resource-header-region',
        bodyRegion: '#resource-body-region'

module.exports = ResourceLayoutView