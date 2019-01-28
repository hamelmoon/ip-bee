'use strict'

const cors = require('cors')
const etag = require('etag')
const express = require('express')
const sharp = require('sharp')
const url = require('url')
const expressValidator = require('express-validator')
const logging = require('../middleware/logging')
// TODO: replace http/https with request-promise:
// const request = require('request-promise')
const http = require('http')
const https = require('https')


//이미지 리사이즈
const transform = function (width, height, crop, gravity, cropMaxSize) {
    const transformer = sharp()
    if (crop) {
        const aspectRatio = width / height
        if (width > cropMaxSize || height > cropMaxSize) {
            if (width > height) {
                width = cropMaxSize
                height = Math.round(width / aspectRatio)
            } else {
                height = cropMaxSize
                width = Math.round(height * aspectRatio)
            }
        }
        transformer.resize(width, height).crop(gravity || sharp.gravity.center)
    } else {
        transformer.resize(width, height).min().withoutEnlargement()
    }
    return transformer
}


//image resize core
module.exports = function (options) {
    const router = express.Router()
    router.use(expressValidator({
        customValidators: {
            isSharpFormat: function (value) {
                return sharp.format.hasOwnProperty(value)
            },
            isGravity: function (value) {
                return sharp.gravity.hasOwnProperty(value)
            },
            isQuality: function (value) {
                return value >= 0 && value <= 100
            },
            isUrlPathQuery: function (value) {
                if (!value) {
                    return false
                }
                const u = url.parse(value)
                if (!u.protocol || !u.host || !u.path) {
                    return false
                }
                return true
            },
        },
    }))

    const _cors = cors(options.cors || {})
    const cropMaxSize = options.cropMaxSize || 1000
    const protocol = http;
    const whitelist = options.whitelist || ['http://devipbee.esmplus.com', 'http://ipbee.esmplus.com']


    //width 는 필수, height 는 선택
    router.get('/resize/:width/:height?', _cors, function (req, res, next) {
        let format = req.query.format
        if (req.headers.accept && req.headers.accept.indexOf('image/jpeg') !== -1) {
            format = format || 'jpeg'
        }
        const quality = parseInt(req.query.quality || 75, 10)

        req.checkParams('height').optional().isInt()
        req.checkParams('width').isInt()
        req.checkQuery('format').optional().isSharpFormat()
        req.checkQuery('quality').optional().isQuality()
        req.checkQuery('progressive').optional().isBoolean()
        req.checkQuery('crop').optional().isBoolean()
        req.checkQuery('gravity').optional().isGravity()
        req.checkQuery('url').isUrlPathQuery()

        const errors = req.validationErrors()
        if (errors) {
            return res.status(400).json(errors)
        }

        const imageUrl = req.query.url;

        const width = parseInt(req.params.width, 10)
        const height = parseInt(req.params.height, 10) || null
        const crop = req.query.crop === 'true'
        const gravity = req.query.gravity
        const transformer = transform(width, height, crop, gravity, cropMaxSize)
            .on('error', function sharpError(err) {
                res.status(500)
                next(new Error(err))
            })

        //캐쉬는 CDN 에서 하자
        //const etagBuffer = Buffer.from([imageUrl, width, height, format, quality])
        //res.setHeader('ETag', etag(etagBuffer, { weak: true }))
        //if (req.fresh) {
        //    return res.sendStatus(304)
        //}

        logging.debug('Requesting:' + imageUrl)

        protocol
            .get(imageUrl, function getImage(result) {
                logging.debug('Requested ' + imageUrl + ' Status: ' + result.statusCode)
                if (result.statusCode >= 400) {
                    return res.sendStatus(result.statusCode)
                }
                res.status(result.statusCode)
                const inputFormat = result.headers['content-type'] || ''
                format = format || inputFormat.replace('image/', '')

                format = sharp.format.hasOwnProperty(format) ? format : 'jpeg'
                transformer[format]({
                    quality: quality,
                    progressive: req.query.progressive === 'true',
                })

                res.type('image/' + format)
                result.pipe(transformer).pipe(res)
            })
            .on('error', next)
    })

    return router
}

