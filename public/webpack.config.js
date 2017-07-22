const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, './dist/assets'),
        publicPath: '/dist/assets/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        publicPath: '/dist/assets/',
        contentBase: './'
    }
};
