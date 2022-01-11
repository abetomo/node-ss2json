'use strict'

const Ss2Json = require('../ss_to_json')
const ss2json = new Ss2Json()

const path = require('path')
const jsonPath = path.join(__dirname, '../google/__tests__/fixtures/auth.json')
const testParams = {
  authJsonPath: jsonPath,
  spreadsheetId: 'spreadsheetId',
  sheetName: 'sheetName',
  values: ['dummy']
}

/* global describe, test, expect */
describe('ss2json', () => {
  test('ss2json is instanceOf Ss2Json', () => {
    expect(ss2json).toBeInstanceOf(Ss2Json)
  })

  test('_arrayToObject', () => {
    const array = [
      ['colname1', 'colname2'],
      ['valueA', 'valueB'],
      ['valueC', 'valueD']
    ]
    const expected = [{
      colname1: 'valueA',
      colname2: 'valueB'
    }, {
      colname1: 'valueC',
      colname2: 'valueD'
    }]
    expect(Ss2Json._arrayToObject(array)).toEqual(expected)
  })

  test('_objectToArray', () => {
    const object = [{
      colname1: 'valueA',
      colname2: 'valueB'
    }, {
      colname1: 'valueC',
      colname2: 'valueD'
    }]
    const expected = [
      ['colname1', 'colname2'],
      ['valueA', 'valueB'],
      ['valueC', 'valueD']
    ]
    expect(Ss2Json._objectToArray(object)).toEqual(expected)
  })

  test('convert', async () => {
    const data = await ss2json.convert(testParams)
    expect(data).toEqual([
      { col1: 'a', col2: 'b', col3: 'c' },
      { col1: 'e', col2: 'f', col3: 'g' }
    ])
  })

  test('convert failed', () => {
    const promise = ss2json.convert({ authJsonPath: null })
    expect(promise).rejects.toThrow()
  })

  test('update', async () => {
    const data = await ss2json.update(testParams)
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

  test('update failed', () => {
    const promise = ss2json.update({ authJsonPath: null })
    expect(promise).rejects.toThrow()
  })
})
