const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './app.js',
    output: {
        filename: 'main.js',
        path:path.resolve(__dirname,'dist'),
    }
}

module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel_loader',
                options: {
                    presets:['@babel/preset-env']
                }
            }
        }
    ]
}