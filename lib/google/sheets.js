'use strict'

const { google } = require('googleapis')

class GoogleSheets {
  constructor (authClient) {
    this.sheets = google.sheets({
      version: 'v4',
      auth: authClient
    })
  }

  getRange (name) {
    return `${name}!A1:Z`
  }

  get (params) {
    return new Promise((resolve, reject) => {
      this.sheets.spreadsheets.values.get({
        spreadsheetId: params.spreadsheetId,
        range: this.getRange(params.sheetName)
      }, (err, response) => {
        if (err) reject(err)
        resolve(response.data)
      })
    })
  }

  update (params) {
    return new Promise((resolve, reject) => {
      this.sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: params.spreadsheetId,
        resource: {
          valueInputOption: 'USER_ENTERED',
          data: [{
            range: this.getRange(params.sheetName),
            values: params.values
          }]
        }
      }, (err, response) => {
        if (err) reject(err)
        resolve(response.data)
      })
    })
  }
}

module.exports = GoogleSheets
