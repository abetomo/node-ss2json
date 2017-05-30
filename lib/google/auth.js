'use srict'

const google = require('googleapis')

const GoogleAuth = function (jsonPath) {
  const privatekey = require(jsonPath)
  this.jwtClient = new google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  )
}

GoogleAuth.prototype = {
  client: function () {
    return this.jwtClient
  },

  init: function () {
    const _this = this
    return new Promise((resolve, reject) => {
      _this.jwtClient.authorize((err, tokens) => {
        if (err) reject(err)
        resolve(tokens)
      })
    })
  }
}

module.exports = GoogleAuth
