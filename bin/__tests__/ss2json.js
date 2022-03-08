'use strict'

const path = require('path')
const { execFileSync } = require('child_process')
const ss2jsonBin = path.join(__dirname, '..', 'ss2json')

/* global describe, test, expect */
describe('bin/ss2json', () => {
  test('The current version is displayed', () => {
    const packageJson = require(path.join(__dirname, '../..', 'package.json'))
    const cmd = 'node'
    const args = [ss2jsonBin, '--version']
    const ret = execFileSync(cmd, args)
    expect(ret.toString().trim()).toBe(packageJson.version)
  })

  describe('More tests', () => {
    test.skip('More tests', () => {})
  })
})
