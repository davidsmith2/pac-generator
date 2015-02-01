module.exports = function (App, controller, options) {
    var id = options.model.get('_id');
    options.model.destroy({
        success: function (proxy) {
            console.log('proxy ' + id + ' destroyed');
        }
    });
};
