'use strict';

var express = require('express');
var http = require('http');
var app = module.exports = express();
var join = require('path').join
var config = require('./config');
var core = require('./common/core');

// Prettify HTML
app.locals.pretty = true

// FINALLY, use any error handlers
//에러 발생시, 에러 내용을 html 페이지로 가림
//개발중이라 일단 주석
//app.use(require('./areas/errors/not-found'))

var options = {};

app.use('/image', core(options));

module.exports = app