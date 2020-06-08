'use strict'

const GoogleAuth = require('./google/auth')
const GoogleSheets = require('./google/sheets')
const packageJson = require('../package.json')

class SsToJson {
  constructor ({ authJsonPath, spreadsheetId } = {}) {
    this.authJsonPath = authJsonPath
    this.spreadsheetId = spreadsheetId
    this.auth = authJsonPath && new GoogleAuth(authJsonPath)
    this.sheets = this.auth && new GoogleSheets(this.auth.client())
  }

  version () {
    return packageJson.version
  }

  getSheets (authJsonPath) {
    if (this.sheets) {
      return this.sheets
    }

    const auth = new GoogleAuth(authJsonPath)
    return new GoogleSheets(auth.client())
  }

  getSpreadsheets (authJsonPath) {
    return this.getSheets(authJsonPath).getSpreadsheets()
  }

  convert ({ authJsonPath, spreadsheetId, sheetName }) {
    let sheets
    try {
      sheets = this.getSheets(authJsonPath)
    } catch (e) {
      return Promise.reject(e)
    }

    return sheets.get({
      spreadsheetId: spreadsheetId || this.spreadsheetId,
      sheetName
    }).then((data) => {
      return SsToJson._arrayToObject(data.values)
    })
  }

  async update ({ authJsonPath, spreadsheetId, sheetName, values, autoAdd }) {
    const sheets = this.getSheets(authJsonPath)
    const sheetParams = {
      spreadsheetId: spreadsheetId || this.spreadsheetId,
      sheetName
    }
    const updateParams = {
      ...sheetParams,
      values: SsToJson._objectToArray(values)
    }

    try {
      return await sheets.update(updateParams)
    } catch (e) {
      if (!e.message.includes('Unable to parse range') || autoAdd !== true) {
        throw e
      }
    }

    // Add when there was no sheet.
    await sheets.addSheet(sheetParams)
    return sheets.update(updateParams)
  }

  static _arrayToObject (array) {
    const header = array.shift()
    return array.map((v) => {
      return header.reduce((acc, key, i) => {
        acc[key] = v[i]
        return acc
      }, {})
    })
  }

  static _objectToArray (object) {
    const header = Object.keys(object[0])
    return [header].concat(object.map((data) => {
      return header.map(k => data[k])
    }))
  }
}

module.exports = SsToJson
