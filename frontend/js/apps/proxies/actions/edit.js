var Backbone = require('backbone');

var ModalView = require('../../../common/views/modal');
var FormView = require('../views/form');

module.exports = function (App, controller, options) {
    var formView = new FormView({model: options.model});
    var modalView = new ModalView({model: new Backbone.Model({title: 'Edit proxy'})});
    App.modalRegion.show(modalView);
    modalView.bodyRegion.show(formView);
    controller.listenTo(modalView, 'save', function () {
        var attributes = {};
        attributes.name = formView.$el.find('[name=name]').val();
        attributes.server = formView.$el.find('[name=server]').val();
        attributes.port = formView.$el.find('[name=port]').val();
        options.model.save(attributes, {
            success: function (proxy) {
                console.log('proxy ' + proxy.get('_id') + ' edited');
            }
        });
    });
};