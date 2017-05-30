'use strict'

const assert = require('chai').assert
const path = require('path')
const GoogleSheets =
  require(path.join(__dirname, '..', 'lib', 'google', 'sheets'))

/* global describe, it */
describe('GoogleSheets', () => {
  it('GoogleSheets is instanceOf Object', () => {
    assert.instanceOf(GoogleSheets, Object)
  })

  it('More tests')
})
