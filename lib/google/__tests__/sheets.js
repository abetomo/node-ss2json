'use strict'

const path = require('path')
const GoogleAuth = require('../auth')
const GoogleSheets = require('../sheets')
const jsonPath = path.join(__dirname, 'fixtures', 'auth.json')
const testParams = {
  spreadsheetId: 'spreadsheetId',
  sheetName: 'sheetName',
  values: ['dummy']
}

/* global beforeAll, describe, test, expect */
describe('GoogleSheets', () => {
  let sheets = null
  beforeAll(() => {
    const auth = new GoogleAuth(jsonPath)
    sheets = new GoogleSheets(auth.client())
  })

  test('sheets is instanceOf GoogleSheets', () => {
    expect(sheets).toBeInstanceOf(GoogleSheets)
  })

  test('getRange()', () => {
    expect(sheets.getRange('hoge')).toBe('hoge!A1:Z')
    expect(sheets.getRange('%fuga%')).toBe('%fuga%!A1:Z')
  })

  test('get()', () => {
    return sheets.get(testParams).then(data => {
      expect(data).toEqual({
        range: 'name!A1:Z9',
        majorDimension: 'ROWS',
        values: [
          ['col1', 'col2', 'col3'],
          ['a', 'b', 'c'],
          ['e', 'f', 'g']
        ]
      })
    })
  })

  test('get() failed', () => {
    const params = Object.assign({}, testParams)
    params.spreadsheetId = 'failed'
    return sheets.get(params).then(data => {
      expect(data).toBeUndefined(data)
    }).catch(e => {
      expect(e).toEqual(new Error('Error: get'))
    })
  })

  test('update()', () => {
    return sheets.update(testParams).then(data => {
      expect(data).toEqual({
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
      })
    })
  })

  test('update() failed', () => {
    const params = Object.assign({}, testParams)
    params.spreadsheetId = 'failed'
    return sheets.update(params).then(data => {
      expect(data).toBeUndefined(data)
    }).catch(e => {
      expect(e).toEqual(new Error('Error: batchUpdate'))
    })
  })
})
