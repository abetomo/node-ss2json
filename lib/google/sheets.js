'use strict'

const google = require('googleapis')
const sheets = google.sheets('v4')

class GoogleSheets {
  constructor (authClient) {
    this.authClient = authClient
  }

  getRange (name) {
    return `${encodeURIComponent(name)}!A1:Z`
  }

  get (params) {
    return new Promise((resolve, reject) => {
      sheets.spreadsheets.values.get({
        auth: this.authClient,
        spreadsheetId: params.spreadsheetId,
        range: this.getRange(params.sheetName)
      }, (err, response) => {
        if (err) reject(err)
        resolve(response)
      })
    })
  }

  update (params) {
    return new Promise((resolve, reject) => {
      sheets.spreadsheets.values.batchUpdate({
        auth: this.authClient,
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
        resolve(response)
      })
    })
  }
}

module.exports = GoogleSheets
