'use srict'

const google = require('googleapis')
const sheets = google.sheets('v4')

const GoogleSheets = function (authClient) {
  this.authClient = authClient
}

GoogleSheets.prototype = {
  get: function (params) {
    const _this = this
    return new Promise((resolve, reject) => {
      sheets.spreadsheets.values.get({
        auth: _this.authClient,
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
