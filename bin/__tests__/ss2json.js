'use strict'

const path = require('path')
const execSync = require('child_process').execSync
const ss2json = path.join(__dirname, '..', 'ss2json')

/* global describe, test, expect */
describe('bin/ss2json', () => {
  test('The current version is displayed', () => {
    const packageJson = require(path.join(__dirname, '../..', 'package.json'))
    const ret = execSync(`node ${ss2json} --version`)
    expect(ret.toString().trim()).toBe(packageJson.version)
  })

  describe('More tests', () => {
    test.skip('More tests', () => {})
  })
})
