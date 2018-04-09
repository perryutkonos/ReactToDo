'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {

    entry: {
        app: "./src/index",
    },

    output: {
        path: path.join(__dirname, '/build'),
        filename: '[name].js'
    },

    devServer: {
        contentBase: path.join(__dirname, "build"),
        compress: true,
        port: 9000
    },

    watch: true,

    module: { //Обновлено
        rules: [ //добавили babel-loader
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    "presets": ["env", "stage-0", "react"],
                }
            }, {
                test: /\.css/,
                loader: 'style-loader!css-loader?resolve url'

            }, {
                test: /\.(html)$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    }
}