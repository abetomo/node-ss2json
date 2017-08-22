'use strict'

const path = require('path')
const Ss2Json = require(path.join(__dirname, '..', 'ss_to_json'))
const ss2json = new Ss2Json()

/* global describe, test, expect */
describe('ss2json', () => {
  test('ss2json is instanceOf Ss2Json', () => {
    expect(ss2json).toBeInstanceOf(Ss2Json)
  })

  test('version should be set', () => {
    const packageVersion = '0.2.2'
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

  test('More tests')
})
