'use strict'

const path = require('path')
const Ss2Json = require(path.join(__dirname, '..', 'ss_to_json'))
const ss2json = new Ss2Json()

/* global describe, test, expect */
describe('ss2json', () => {
  test('ss2json is instanceOf Ss2Json', () => {
    expect(ss2json).toBeInstanceOf(Ss2Json)
  })

  test('version should be set', function () {
    const packageVersion = '0.2.1'
    expect(ss2json.version()).toBe(packageVersion)
  })

  test('More tests')
})
