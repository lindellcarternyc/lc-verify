import constant from './constant'
import { expectValue } from './test.utils'

describe('constant', () => {
  it('should always return the same constant value', () => {
    const values = [100, {}, [], null, undefined]
    const schema = constant('hello world')
    values.forEach(value => {
      const result = schema.validate(value)
      expectValue('hello world', result)
    })
  })
})