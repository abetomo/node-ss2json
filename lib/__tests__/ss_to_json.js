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

  test('version should be set', () => {
    const packageVersion = '2.1.2'
    expect(ss2json.version()).toBe(packageVersion)
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

  test('convert', () => {
    return ss2json.convert(testParams).then(data => {
      expect(data).toEqual([
        { col1: 'a', col2: 'b', col3: 'c' },
        { col1: 'e', col2: 'f', col3: 'g' }
      ])
    })
  })

  test('convert failed', () => {
    return ss2json.convert({ authJsonPath: null }).then(data => {
      expect(data).toBeUndefined(data)
    }).catch(e => {
      expect(e).not.toBeNull()
      expect(e).not.toBeUndefined()
    })
  })

  test('update', () => {
    return ss2json.update(testParams).then(data => {
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

  test('update failed', () => {
    return ss2json.update({ authJsonPath: null }).then(data => {
      expect(data).toBeUndefined(data)
    }).catch(e => {
      expect(e).not.toBeNull()
      expect(e).not.toBeUndefined()
    })
  })
})
