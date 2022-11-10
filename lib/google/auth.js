'use strict'

const { readFileSync } = require('node:fs')
const { google } = require('googleapis')

class GoogleAuth {
  constructor (jsonOrPath) {
    const privatekey = typeof jsonOrPath === 'string'
      ? JSON.parse(readFileSync(jsonOrPath))
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
