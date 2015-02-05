module.exports = {
    web: {
        options: {
            stream: true
        },
        tasks: [
            {
                grunt: true,
                args: ['watch:copy']
            },
            {
                grunt: true,
                args: ['watch:coffeeify']
            },
            {
                grunt: true,
                args: ['watch:livereload']
            },
            {
                grunt: true,
                args: ['watch:backend']
            }
        ]
    }
};