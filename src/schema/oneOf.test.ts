import oneOf from './oneOf'
import number from './number'
import string from './string'
import { Ok } from '../result/result'

describe('oneOf', () => {
  const schema = oneOf<number | string>('test', [number(), string()])

  it('validate a good value', () => {
    const vals = [1, 'hello']
    vals.forEach(val => {
      const res = schema.validate(val)

      expect(res.isOk()).toBe(true)

      expect((res as Ok<string | number>).value).toBe(val)
    })
  })

  it('should reject others', () => {
    for (const val of [{}, [], null, undefined]) {
      expect(schema.validate(val).isOk()).toBe(false)
    }
  })
})