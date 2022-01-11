'use strict'

const Ss2Json = require('..')
const ss2json = new Ss2Json()

const path = require('path')
const jsonPath = path.join('lib/google/__tests__/fixtures/auth.json')
const testParams = {
  authJsonPath: jsonPath,
  spreadsheetId: 'spreadsheetId',
  sheetName: 'sheetName',
  values: ['dummy']
}

/* global describe, test expect */
describe('Ss2Json', () => {
  test('ss2json is instanceOf Ss2Json', () => {
    expect(ss2json).toBeInstanceOf(Ss2Json)
  })

  test('convert', async () => {
    const data = await ss2json.convert(testParams)
    expect(data).toEqual([
      { col1: 'a', col2: 'b', col3: 'c' },
      { col1: 'e', col2: 'f', col3: 'g' }
    ])
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
})
