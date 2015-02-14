Marionette = require 'marionette'

class PublishView extends Marionette.ItemView
    template: require './templates/publish.hbs'
    className: 'pull-right mt1'
    ui:
        publish: '.js-publish'
    events:
        'click @ui.publish': 'publish'
    behaviors:
        PublishBehavior:
            behaviorClass: require '../../../common/behaviors/PublishBehavior'
            buttonSelector: '.js-publish'
    publish: (e) =>
        e.preventDefault()
        @.disable()
        @.trigger 'publish'
    enable: () =>
        @.trigger 'publish:enable'
    disable: (e) =>
        @.trigger 'publish:disable'

module.exports = new PublishView
