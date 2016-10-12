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
        dest: './dist/public/js/libs.js',
        options: {
            external: null,
            require: libs
        }
    },
    app: {
        src: ['./src/public/js/app.coffee'],
        dest: './dist/public/js/app.js',
        options: {
            browserifyOptions: {
                debug: true,
                extensions: ['.coffee']
            },
            external: libs,
            transform: [
                'browserify-shim',
                'coffeeify',
                'hbsfy'
            ]
        }
    }
};
