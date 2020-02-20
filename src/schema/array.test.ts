import array from './array'
import string from './string'

import { expectValue } from './test.utils'
import { Err } from '../result/result'
import succeed from './succeed'

describe('array', () => {
  it('should accept an array where every value passes validation', () => {
    const arr: string[] = ["hello", "world"]
    const schema = array('array', string())
    const res = schema.validate(arr)
    expectValue(arr, res)
  })

  it('should reject the first value that fails', () => {
    const arr = [1, 2, 3]
    const schema = array('Array', string())
    const res = schema.validate(arr)

    expect(res.isOk()).toBe(false)
    const { error } = res as Err<string[]>
    expect(error).toContain('index "0"')
  })

  it('should reject any object that is not an array', () => {
    const schema = array('array', succeed)
    const notArrays = [{}, null, undefined, 100]
    notArrays.forEach(val => {
      const res = schema.validate(val)
      expect(res.isOk()).toBe(false)
      const { error } = res as Err<any>
      expect(error).toContain(`${JSON.stringify(val)} is not a valid array`)
    })
  })
})