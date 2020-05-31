'use strict'

const { google } = require('googleapis')

class GoogleSheets {
  constructor (authClient) {
    this.sheets = google.sheets({
      version: 'v4',
      auth: authClient
    })
  }

  getSpreadsheets () {
    return this.sheets.spreadsheets
  }

  getRange (name) {
    return `${name}!A1:Z`
  }

  get ({ spreadsheetId, sheetName }) {
    return new Promise((resolve, reject) => {
      this.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: this.getRange(sheetName)
      }, (err, response) => {
        if (err) return reject(err)
        resolve(response.data)
      })
    })
  }

  update ({ spreadsheetId, sheetName, values }) {
    return new Promise((resolve, reject) => {
      this.sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: spreadsheetId,
        resource: {
          valueInputOption: 'USER_ENTERED',
          data: [{
            range: this.getRange(sheetName),
            values: values
          }]
        }
      }, (err, response) => {
        if (err) return reject(err)
        resolve(response.data)
      })
    })
  }

  addSheet ({ spreadsheetId, sheetName }) {
    return new Promise((resolve, reject) => {
      this.sheets.spreadsheets.batchUpdate({
        spreadsheetId: spreadsheetId,
        resource: {
          requests: [{
            addSheet: {
              properties: {
                title: sheetName
              }
            }
          }]
        }
      }, (err, response) => {
        if (err) return reject(err)
        resolve(response)
      })
    })
  }
}

module.exports = GoogleSheets
