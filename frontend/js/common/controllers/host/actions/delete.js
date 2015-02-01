module.exports = function (App, controller, options) {
    var id = options.model.get('_id');
    options.model.destroy({
        success: function (host) {
            console.log('host ' + id + ' destroyed');
        }
    });
};
