import isNull from './isNull'
import { expectValue, expectError } from './test.utils'

describe('isNull', () => {
  it('should accept null', () => {
    const schema = isNull('hello')
    const res = schema.validate(null)
    expectValue('hello', res)
  })

  it('should reject other values', () => {
    const schema = isNull(null)
    const res = schema.validate(100)
    expectError(`100 is not strictly equal (===) to null`, res)
  })
})
