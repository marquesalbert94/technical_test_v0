process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')

module.exports = environment.toWebpackConfig()

const environment = require('./environment')
const path = require('path')
const { config: webpackerConfig } = require('@rails/webpacker')

environment.config.devtool = 'cheap-eval-source-map'
environment.config.output.filename = '[name].js'
module.exports = environment.toWebpackConfig()