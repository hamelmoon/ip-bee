'use strict'

var path = require('path')
var rootPath = path.join(__dirname, '/../..')
var PRODUCTION = process.env.NODE_ENV === 'production'

var config = module.exports = {
    root: rootPath,
    http: {
        port: process.env.PORT || 3000
    },
    express : {
        port: process.env.EXPRESS_PORT || 3000,
        ip: '0.0.0.0'
    },
    https: {
        port: false,

        // Paths to key and cert as string
        ssl: {
            key: '',
            cert: '',
            ca: ''
        }
    },
    hostname: process.env.HOST || process.env.HOSTNAME,
    templateEngine: 'ejs',

    public: {
        languages: [{
            locale: 'kr',
            direction: 'ltr'
        }],
        currentLanguage: 'kr',
    },
    clusterSticky: false,
    stickyOptions: {
        proxy: false, // activate layer 4 patching
        header: 'x-forwarded-for', // provide here your header containing the users ip
        num: (process.env.CPU_COUNT || require('os').cpus().length) - 1
    }
}