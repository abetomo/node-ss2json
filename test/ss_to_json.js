'use strict'

const assert = require('chai').assert
const path = require('path')
const Ss2Json = require(path.join(__dirname, '..', 'lib', 'ss_to_json'))

/* global describe, it */
describe('Ss2Json', () => {
  it('Ss2Json is instanceOf Object', () => {
    assert.instanceOf(Ss2Json, Object)
  })

  it('version should be set', function () {
    const packageVersion = '0.0.21'
    assert.equal(Ss2Json.version(), packageVersion)
  })

  it('More tests')
})
