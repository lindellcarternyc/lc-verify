import boolean from './boolean'
import { Ok, Err } from '../result/result';

describe('boolean', () => {
  describe('#decode', () => {
    it('should accept true or false', () => {
      const validator = boolean();
      [true, false].forEach(bool => {
        const res = validator.validate(bool)
        expect(res.isOk()).toBe(true)
        const resVal = (res as Ok<boolean>).value
        expect(resVal).toBe(bool)
      })
    })

    it('should reject anything else', () => {
      const validator = boolean()
      const values = [1, {}, [], 'string']
      values.forEach(val => {
        const res = validator.validate(val)
        expect(res.isOk()).toBe(false)
        const resErr = (res as Err<boolean>).error
        expect(resErr).toBe(`${JSON.stringify(val)} is not a valid boolean`)
      })
    })
  })
})