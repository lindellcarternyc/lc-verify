import succeed from './succeed'
import { Ok } from '../result/result'

describe('succed', () => {
  it('should create a decoder that always succeeds', () => {
    [1, 'hello', {}, [], null, undefined].forEach(val => {
      const res = succeed.validate(val)

      expect(res.isOk()).toBe(true)

      expect((res as Ok<any>).value).toEqual(val)
    })
  })
})