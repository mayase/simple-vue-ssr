let config = require('./config.js'),
    express = require('express'),
    glob = require('glob'),
    serialize = require('serialize-javascript'),
    favicon = require('serve-favicon');

/**
 * Server
 */

let app = express();

/**
 * SSR
 */
let fs = require('fs'),
    path = require('path'),
    renderer = require('vue-server-renderer').createBundleRenderer(fs.readFileSync(config.serverBundle, 'utf-8')),
    layout = fs.readFileSync(`${config.staticRoot}/index.html`, 'utf8');

global.Vue = require('vue');


/**
 * req res cycle
 */

app.use(favicon(`${config.staticRoot}/assets/favicon.ico`));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/json', function(req, res){
    res.json([
        {title: 'title 1'},
        {title: 'title 2'},
        {title: 'title 3'},
        {title: 'title 4'},
        {title: 'title 5'}
        ]);
});
app.use(express.static(config.staticRoot, {index: false}));
app.use('*', function(req, res){
    let context = { url: req.originalUrl };
    renderer.renderToString(context,
        function (error, html) {
            if (error) {
                console.error(error);
                return res
                    .status(500)
                    .send(layout);
            }
            let initialState = !context.initialState ? '' :
                `<script>window.__INITIAL_STATE__=${serialize(context.initialState, { isJSON: true })}</script>`;

            res.send(layout.replace('<div id="app"></div>', `<div id="app">${html}</div>${initialState}`))
        }
    );
});



module.exports = app.listen(config.port, function (err) {
    if (err) {
        console.log(err);
        return
    }
    console.log('Listening at http://localhost:' + config.port + '\n')
});


