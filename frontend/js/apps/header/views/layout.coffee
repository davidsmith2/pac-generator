Marionette = require 'marionette'

class LayoutView extends Marionette.LayoutView
    template: require './templates/layout.hbs'
    className: 'page-header row no-gutter'
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
        @.disablePublishing()
        @.trigger 'publish'
    enablePublishing: () =>
        @.trigger 'publish:enable'
    disablePublishing: (e) =>
        @.trigger 'publish:disable'

module.exports = LayoutView
