'use strict'

const assert = require('chai').assert
const path = require('path')
const GoogleAuth = require(path.join(__dirname, '..', 'lib', 'google', 'auth'))

/* global describe, it */
describe('GoogleAuth', () => {
  it('GoogleAuth is instanceOf Object', () => {
    assert.instanceOf(GoogleAuth, Object)
  })

  it('More tests')
})
