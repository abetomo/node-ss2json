'use srict'

const google = require('googleapis')
const sheets = google.sheets('v4')

class GoogleSheets {
  constructor (authClient) {
    this.authClient = authClient
  }

  get (params) {
    return new Promise((resolve, reject) => {
      sheets.spreadsheets.values.get({
        auth: this.authClient,
        spreadsheetId: params.spreadsheetId,
        range: `${params.sheetName}!A1:Z`
      }, (err, response) => {
        if (err) reject(err)
        resolve(response)
      })
    })
  }
}

module.exports = GoogleSheets
