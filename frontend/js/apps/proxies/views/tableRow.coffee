Marionette = require 'marionette'
$ = require 'jquery'
require 'bootstrap'

class TableRowView extends Marionette.ItemView
    template: require './templates/tableRow.hbs'
    tagName: 'tr'
    ui:
        copy:                   '.js-copy'
        'delete':               '.js-delete'
        edit:                   '.js-edit'
        publish:                '.js-publish'
    triggers:
        'click @ui.delete':     'delete'
        'click @ui.edit':       'edit'
        'click @ui.publish':    'publish'
    events:
        'click @ui.copy':       'copy'
    modelEvents:
        'change':               'changed'
    behaviors:
        PublishBehavior:
            behaviorClass: require '../../../common/behaviors/PublishBehavior'
            buttonSelector: '.js-publish'
    changed: () =>
        @.render()
        @.enablePublishing()
    copy: (e) =>
        $el = @.ui.copy
        e.preventDefault()
        $el.tooltip().on 'shown.bs.tooltip', () =>
            @.trigger 'copy', model: self.model
    enablePublishing: () =>
        @.trigger 'publish:enable'
    disablePublishing: () =>
        @.trigger 'publish:disable'

module.exports = TableRowView