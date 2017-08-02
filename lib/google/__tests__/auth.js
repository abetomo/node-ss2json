'use strict'

const path = require('path')
const GoogleAuth = require(path.join(__dirname, '..', 'auth'))

/* global describe, test, expect */
describe('GoogleAuth', () => {
  test('GoogleAuth is instanceOf Object', () => {
    expect(GoogleAuth).toBeInstanceOf(Object)
  })

  test('More tests')
})
