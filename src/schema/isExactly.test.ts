import isExactly from './isExactly'
import { expectValue, expectError } from './test.utils'

describe('isExactly', () => {
  it('should accept `exactly` the same value', () => {
    const values = [1, 'hello', true, false, null]

    values.forEach(val => {
      const exact = isExactly(val)
      const result = exact.validate(val)
      expectValue(val, result)
    })
  })

  it('should not work with other values', () => {
    const exact = isExactly(false)
    expectError('is not exactly false', exact.validate(true))
  })
})