var libs = [
    'backbone',
    'backbone-relational',
    'bootstrap',
    'bootstrap-growl',
    'handlebars',
    'jquery',
    'marionette',
    'underscore'
];

module.exports = {
    libs: {
        src: [],
        dest: './build/js/libs.js',
        options: {
            external: null,
            require: libs
        }
    },
    app: {
        src: ['./frontend/js/app.coffee'],
        dest: './build/js/app.js',
        options: {
            browserifyOptions: {
                debug: true,
                extensions: ['.coffee']
            },
            external: libs,
            watch: true
        }
    }
};