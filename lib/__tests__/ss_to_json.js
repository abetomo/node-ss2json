'use strict'

const path = require('path')
const Ss2Json = require(path.join(__dirname, '..', 'ss_to_json'))

/* global describe, test, expect */
describe('Ss2Json', () => {
  test('Ss2Json is instanceOf Object', () => {
    expect(Ss2Json).toBeInstanceOf(Object)
  })

  test('version should be set', function () {
    const packageVersion = '0.1.0'
    expect(Ss2Json.version()).toBe(packageVersion)
  })

  test('More tests')
})
