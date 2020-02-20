import optional from './optional'
import string from './string'
import { Ok } from '../result/result'

describe('optional', () => {
  it('#decode', () => {
    const schema = optional(string())

    const values = [null, undefined, 'hello world']
    values.forEach(value => {
      const result = schema.validate(value)

      expect(result.isOk()).toBe(true)
      const resultVal = result as Ok<string | undefined>
      if (typeof value === 'string') {
        expect(resultVal.value).toBe(value)
      } else {
        expect(resultVal.value).toBe(undefined)
      }
    })
  })
})