/* global jest */

'use strict'

const googleapis = jest.genMockFromModule('googleapis')

// auth
class JWT {
  constructor () {
    return {
      authorize (callback) {
        callback(null, {
          access_token: 'access_token',
          expiry_date: 999999,
          refresh_token: 'jwt-placeholder',
          token_type: 'Bearer'
        })
      }
    }
  }
}
googleapis.google.auth = { JWT: JWT }

// spreadsheets
const sheetsObject = { spreadsheets: { values: {} } }
sheetsObject.spreadsheets.values = {
  get (_, callback) {
    if (_.spreadsheetId === 'failed') {
      callback(new Error('Error: get'))
      return
    }
    callback(null, {
      data: {
        range: 'name!A1:Z9',
        majorDimension: 'ROWS',
        values: [
          ['col1', 'col2', 'col3'],
          ['a', 'b', 'c'],
          ['e', 'f', 'g']
        ]
      }
    })
  },

  batchUpdate (_, callback) {
    if (_.spreadsheetId === 'failed') {
      callback(new Error('Error: batchUpdate'))
      return
    }
    callback(null, {
      data: {
        spreadsheetId: 'spreadsheetId',
        totalUpdatedRows: 1,
        totalUpdatedColumns: 2,
        totalUpdatedCells: 3,
        totalUpdatedSheets: 4,
        responses: [{
          spreadsheetId: 'spreadsheetId',
          updatedRange: 'name!A1:Z9',
          updatedRows: 5,
          updatedColumns: 5,
          updatedCells: 7
        }]
      }
    })
  }
}
googleapis.google.sheets = () => sheetsObject

module.exports = googleapis
