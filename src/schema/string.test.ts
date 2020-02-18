import string from './string'
import { Ok, Err } from '../result/result'

describe('string', () => {
  describe('#validate', () => {
    it('accept strings', () => {
      const validator = string()
      const values = ['hello', 'world', 'ça va']
      values.forEach(val => {
        const result = validator.validate(val)
        expect(result.isOk()).toBe(true)
        expect((result as Ok<string>).value).toBe(val)
      })
    })

    it('should reject other values', () => {
      const validator = string()
      const notStrings = [{}, [], () => { }, 42]
      notStrings.forEach(v => {
        const res = validator.validate(v)
        expect(res.isOk()).toBe(false)
        expect((res as Err<string>).error).toBe(`${JSON.stringify(v)} is not a valid string`)
      })
    })

    it('should accept minLength', () => {
      const validator = string({
        minLength: 5
      })

      expect(validator.validate('hello').isOk()).toBe(true)
      expect(validator.validate('').isOk()).toBe(false)
    })

    it('should accept maxLength', () => {
      const validator = string({
        maxLength: 20
      })

      expect(validator.validate('hello').isOk()).toBe(true)
      expect(validator.validate('askfalskgfjqopwrkgaplskfngasdg').isOk()).toBe(false)
    })

    it('should accept a pattern', () => {
      const validator = string({
        pattern: /^lindell/
      })

      expect(validator.validate('lindell').isOk()).toBe(true)
      expect(validator.validate('hello').isOk()).toBe(false)
    })

    it('should accept and equals parameter', () => {
      const v = string({ equals: 'hello' })
      
      expect(v.validate('hello').isOk()).toBe(true)
      expect(v.validate('hello1').isOk()).toBe(false)
    })
  })
})