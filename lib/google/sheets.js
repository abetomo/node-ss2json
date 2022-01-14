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

  async get ({ spreadsheetId, sheetName }) {
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId,
      range: this.getRange(sheetName)
    })
    return response.data
  }

  async update ({ spreadsheetId, sheetName, values }) {
    const response = await this.sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      resource: {
        valueInputOption: 'USER_ENTERED',
        data: [{
          range: this.getRange(sheetName),
          values
        }]
      }
    })
    return response.data
  }

  addSheet ({ spreadsheetId, sheetName }) {
    return this.sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: {
        requests: [{
          addSheet: {
            properties: {
              title: sheetName
            }
          }
        }]
      }
    })
  }
}

module.exports = GoogleSheets
