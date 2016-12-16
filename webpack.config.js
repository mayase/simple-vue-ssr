let HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack'),

    pathSource  = __dirname + '/src/app',
    pathBuild   = __dirname,
    pathDev     = `${pathBuild}/dev`,
    pathDist    = `${pathBuild}/static`;

/**
 * Plugins
 */
let plugins = {
    copyHTML: new HtmlWebpackPlugin({
        template: pathSource + '/index.html',
        filename: 'index.html'
    }),
    uglify: new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    occurrenceOptimize: new webpack.optimize.OccurenceOrderPlugin()
};

/**
 *  Common build process
 */
let commonConfig = {
    entry: [
        pathSource + '/entry-client.js'
    ],
    module:{
        loaders:[
            {
                test: /\.js$/,
                include:  pathSource,
                loader: 'babel'
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.s[a|c]ss$/,
                loader: 'style!css!sass'
            },
            { test: /\.json$/, loader: "json-loader"}
        ]
    },
    output: {
        filename: 'clientBundle.js',
        path: pathDev,
    },


    plugins: [
        plugins.copyHTML
    ],

    vue:{
        loaders: {
            scss: 'style!css!sass'
        },
        postcss: [require('autoprefixer')()]
    }
};

/**
 * Production config
 */
let productionConfig = {
    output: {
        filename: 'clientBundle.js',
        path: pathDist,
    },

    plugins: [
        plugins.copyHTML,
        plugins.uglify,
        plugins.occurrenceOptimize
    ]
};

/**
 * Server bundle
 */

let serverBundleConfig = {
    entry: [
        pathSource + '/entry-server.js'
    ],
    output: {
        filename: 'serverBundle.js',
        path: pathDist,
        libraryTarget: 'commonjs2'
    },
    target: 'node',

    plugins: [
        plugins.uglify,
        plugins.occurrenceOptimize
    ]
};

let webpackConfig;
switch (process.env.BUNDLE_MODE){
    case 'build_client':
        webpackConfig = Object.assign(commonConfig, productionConfig);
        break;
    case 'build_server':
        webpackConfig = Object.assign(commonConfig, serverBundleConfig);
        break;
    case 'development':
    default:
        webpackConfig = commonConfig;
        break;
}

module.exports = webpackConfig;