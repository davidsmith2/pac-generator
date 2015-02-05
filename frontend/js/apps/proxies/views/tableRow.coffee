Marionette = require 'marionette'
$ = require 'jquery'
require 'bootstrap'

class TableRowView extends Marionette.ItemView
    template: require './templates/tableRow.hbs'
    tagName: 'tr'
    triggers:
        'click .js-delete': 'delete'
        'click .js-edit': 'edit'
        'click .js-publish': 'publish'
    events:
        'click .js-copy': 'copy'
    modelEvents:
        'change': 'changed'
    copy: (e) =>
        $el = $(e.target)
        self = this
        e.preventDefault()
        $el.tooltip().on 'shown.bs.tooltip', () =>
            self.trigger 'copy', model: self.model
    changed: () =>
        this.render()

module.exports = TableRowView