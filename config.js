let path = require('path'),
    rootPath = path.normalize(__dirname);

module.exports = {
    staticRoot: rootPath + '/static',
    port: 8081,
    serverBundle: rootPath + '/static/serverBundle.js'
};