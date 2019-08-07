'use strict'

const fs = require('fs')
const { google } = require('googleapis')

class GoogleAuth {
  constructor (jsonOrPath) {
    const privatekey = typeof jsonOrPath === 'string'
      ? JSON.parse(fs.readFileSync(jsonOrPath))
      : jsonOrPath
    this.jwtClient = new google.auth.JWT(
      privatekey.client_email,
      null,
      privatekey.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    )
  }

  client () {
    return this.jwtClient
  }
}

module.exports = GoogleAuth
