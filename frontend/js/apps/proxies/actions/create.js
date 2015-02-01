var Backbone = require('backbone');

var Proxy = require('../../../entities/proxy');
var ModalView = require('../../../views/modal');
var FormView = require('../views/form');

module.exports = function (App, controller) {
    var proxy = new Proxy();
    var formView = new FormView({model: proxy});
    var modalView = new ModalView({model: new Backbone.Model({title: 'Create proxy'})});
    App.modalRegion.show(modalView);
    modalView.bodyRegion.show(formView);
    controller.listenTo(modalView, 'save', function () {
        var attributes = {};
        attributes.name = formView.$el.find('[name=name]').val();
        attributes.server = formView.$el.find('[name=server]').val();
        attributes.port = formView.$el.find('[name=port]').val();
        proxy.set(attributes);
        controller.collection.create(proxy.attributes, {
            success: function (__proxy__) {
                console.log('proxy ' + __proxy__.get('_id') + ' created');
            }
        });
    });
};
