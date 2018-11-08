'use strict'

const GoogleAuth = require('./google/auth')
const GoogleSheets = require('./google/sheets')
const packageJson = require('../package.json')

class SsToJson {
  version () {
    return packageJson.version
  }

  convert ({ authJsonPath, spreadsheetId, sheetName }) {
    let auth = null
    try {
      auth = new GoogleAuth(authJsonPath)
    } catch (e) {
      return Promise.reject(e)
    }

    const sheets = new GoogleSheets(auth.client())
    return sheets.get({
      spreadsheetId: spreadsheetId,
      sheetName: sheetName
    }).then((data) => {
      return SsToJson._arrayToObject(data.values)
    })
  }

  update ({ authJsonPath, spreadsheetId, sheetName, values }) {
    let auth = null
    try {
      auth = new GoogleAuth(authJsonPath)
    } catch (e) {
      return Promise.reject(e)
    }

    const sheets = new GoogleSheets(auth.client())
    return sheets.update({
      spreadsheetId: spreadsheetId,
      sheetName: sheetName,
      values: SsToJson._objectToArray(values)
    })
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
