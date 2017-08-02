'use strict'

const path = require('path')
const GoogleSheets = require(path.join(__dirname, '..', 'sheets'))

/* global describe, test, expect */
describe('GoogleSheets', () => {
  test('GoogleSheets is instanceOf Object', () => {
    expect(GoogleSheets).toBeInstanceOf(Object)
  })

  test('More tests')
})
