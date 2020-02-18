import * as VerifyError from './errors'

describe('primitiveError', () => {
  it('should create an appopriate error message', () => {
    const values = [1, 'hello', {}, []]
    const func = VerifyError.primitiveError('string')
    values.forEach(val => {
      expect(func(val)).toBe(`${JSON.stringify(val)} is not a valid string`)
    })
  })
})