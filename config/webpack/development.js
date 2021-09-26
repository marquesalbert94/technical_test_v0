[config]

const environment = require('./environment')
const {config} = require("@rails/webpacker");

module.exports = environment.toWebpackConfig()
