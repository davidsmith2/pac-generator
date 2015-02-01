var Backbone = require('backbone');

var ModalView = require('../../../views/modal');
var FormView = require('../views/form');

module.exports = function (App, controller, options) {
    var formView = new FormView({model: options.model});
    var modalView = new ModalView({model: new Backbone.Model({title: controller.content.modalTitles.edit})});
    App.modalRegion.show(modalView);
    modalView.bodyRegion.show(formView);
    controller.listenTo(modalView, 'save', function () {
        var host = formView.$el.find('[name=host]').val();
        options.model.save({host: host}, {
            success: function (__host__) {
                console.log('host ' + __host__.get('_id') + ' edited');
            }
        });
    });
};
