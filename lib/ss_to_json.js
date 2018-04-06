'use strict'

const GoogleAuth = require('./google/auth')
const GoogleSheets = require('./google/sheets')
const packageJson = require('../package.json')

class SsToJson {
  version () {
    return packageJson.version
  }

  convert (params) {
    const auth = new GoogleAuth(params.authJsonPath)

    return Promise.resolve().then(() => {
      const sheets = new GoogleSheets(auth.client())
      return sheets.get({
        spreadsheetId: params.spreadsheetId,
        sheetName: params.sheetName
      })
    }).then((data) => {
      return SsToJson._arrayToObject(data.values)
    })
  }

  update (params) {
    const auth = new GoogleAuth(params.authJsonPath)

    return Promise.resolve().then(() => {
      const sheets = new GoogleSheets(auth.client())
      return sheets.update({
        spreadsheetId: params.spreadsheetId,
        sheetName: params.sheetName,
        values: SsToJson._objectToArray(params.values)
      })
    })
  }

  static _arrayToObject (array) {
    const header = array.shift()
    return array.map((v) => {
      const object = {}
      header.forEach((key, i) => {
        object[key] = v[i]
      })
      return object
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
