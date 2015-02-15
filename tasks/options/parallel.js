module.exports = {
    web: {
        options: {
            stream: true
        },
        tasks: [
            {
                grunt: true,
                args: ['watch:backend']
            },
            {
                grunt: true,
                args: ['watch:coffee']
            },
            {
                grunt: true,
                args: ['watch:less']
            },
            {
                grunt: true,
                args: ['watch:livereload']
            }
        ]
    }
};