import object from './object'
import string from './string'
import number from './number'
import { Schema } from './schema'
import { Err, Ok } from '../result/result'

describe('object', () => {
  it('should create a validator using a map of validators', () => {
    const validator = object('user', {
      username: string(),
      numFriends: number()
    })

    expect(validator instanceof Schema).toBe(true)
  })

  describe('#decode', () => {
    it('should accept an object that matches provided validators', () => {
      interface User {
        username: string
        numFriends: number
      }

      const userValidator = object<User>('user',{
        username: string(),
        numFriends: number()
      })

      const result = userValidator.validate({
        username: 'lindell',
        numFriends: 5
      })

      expect(result.isOk()).toBe(true)

      expect((result as Ok<User>).value).toEqual({
        username: 'lindell',
        numFriends: 5
      })
    })

    it('should reject an object with correct keys but a value does not pass', () => {
      const validator = object('user', {
        username: string(),
        numFriends: number()
      })

      const result = validator.validate({
        username: 'lindell',
        numFriends: null
      })
      expect(result.isOk()).toBe(false)

      const error = (result as Err<any>).error
      expect(error).toContain('null is not a valid number')
    })
  })
})