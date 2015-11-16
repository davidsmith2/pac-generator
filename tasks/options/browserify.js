var libs = [
    'backbone',
    'backbone-relational',
    'backbone.marionette',
    'bootstrap',
    'handlebars',
    'jquery',
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