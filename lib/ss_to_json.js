'use srict'

const path = require('path')
const GoogleAuth = require(path.join(__dirname, 'google', 'auth'))
const GoogleSheets = require(path.join(__dirname, 'google', 'sheets'))
const packageJson = require(path.join(__dirname, '..', 'package.json'))

class SsToJson {
  version () {
    return packageJson.version
  }

  convert (params) {
    const auth = new GoogleAuth(params.jsonPath)

    return Promise.resolve().then(() => {
      return auth.init()
    }).then(() => {
      const sheets = new GoogleSheets(auth.client())
      return sheets.get({
        spreadsheetId: params.spreadsheetId,
        sheetName: params.sheetName
      })
    }).then((data) => {
      return SsToJson._arrayToJson(data.values)
    })
  }

  _arrayToJson (array) {
    const header = array.shift()
    return new Promise((resolve) => {
      resolve(array.map((v) => {
        const object = {}
        header.forEach((key, i) => {
          object[key] = v[i]
        })
        return object
      }))
    })
  }
}

module.exports = SsToJson
