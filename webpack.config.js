'use strict';
module.exports = {
    entry  : {
        ajax        : "./src/entry.js"
    },
    output : {
        filename : './build/build.js'
    },
    watch : true,
    watchOptions : {
        aggregateTimeout : 100
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};