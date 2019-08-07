'use strict'

const path = require('path')
const GoogleAuth = require('../auth')
const json = require('./fixtures/auth.json')
const jsonPath = path.join(__dirname, 'fixtures', 'auth.json')

/* global beforeAll, describe, test, expect */
describe('GoogleAuth from path', () => {
  let auth = null
  beforeAll(() => {
    auth = new GoogleAuth(jsonPath)
  })

  test('auth is instanceOf GoogleAuth', () => {
    expect(auth).toBeInstanceOf(GoogleAuth)
  })

  test('client() is instanceOf Object', () => {
    expect(auth.client()).toBeInstanceOf(Object)
  })
})

describe('GoogleAuth from json', () => {
  let auth = null
  beforeAll(() => {
    auth = new GoogleAuth(json)
  })

  test('auth is instanceOf GoogleAuth', () => {
    expect(auth).toBeInstanceOf(GoogleAuth)
  })

  test('client() is instanceOf Object', () => {
    expect(auth.client()).toBeInstanceOf(Object)
  })
})
