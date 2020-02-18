import { Schema } from './schema'
import { ok, err } from '../result/result'
import { primitiveError } from '../errors/errors'

const stringError = primitiveError('string')

interface StringOptions { 
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  equals?: string
}
const string = (options: StringOptions = {}) => new Schema<string>(value => {
  const { minLength, maxLength, pattern, equals } = options

  if (typeof value === 'string') {
    if (minLength !== undefined && value.length < minLength) {
      return err(`${JSON.stringify(value)} must be at least ${minLength}`)
    }
    if (maxLength !== undefined && value.length > maxLength) {
      return err(`${JSON.stringify(value)} must be shorter than ${maxLength}`)
    }
    if (pattern !== undefined && !value.match(pattern)) {
      return err(`${JSON.stringify(value)} does not match ${pattern}`)
    }
    if (equals && equals !== value) {
      return err(`${JSON.stringify(value)} does not equal '${JSON.stringify(equals)}'`)
    }
    return ok(value)
  }
  return err(stringError(value))
})

export default string