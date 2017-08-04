'use strict'

const assert = require('chai').assert
const path = require('path')
const Ss2Json = require(path.join(__dirname, '..', 'lib', 'ss_to_json'))
const ss2json = new Ss2Json()

/* global describe, it */
describe('Ss2Json', () => {
  it('Ss2Json is instanceOf Ss2Json', () => {
    assert.instanceOf(ss2json, Ss2Json)
  })

  it('version should be set', function () {
    const packageVersion = '0.1.0'
    assert.equal(ss2json.version(), packageVersion)
  })

  it('More tests')
})
