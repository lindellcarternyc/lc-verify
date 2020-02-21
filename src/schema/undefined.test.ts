import isUndefined from './undefined'
import { expectValue } from './test.utils'
import { Err } from '../result/result'

describe('isUndefined', () => {
  it('should accept undefined and reject any other values', () => {
    const schema = isUndefined(100)

    const res1 = schema.validate(undefined)
    expectValue(100, res1)

    expect((schema.validate(200) as Err<number>).error).toContain('is not undefined')
  })
})