import { Schema } from './schema'
import { primitiveError } from '../errors/errors'
import { ok, err } from '../result/result'

interface NumberOptions {
  min?: number
  max?: number
  between?: [number, number]
  equals?: number
}

const numberError = primitiveError('number')
const number = (options: NumberOptions = {}): Schema<number> => new Schema<number>(value => {
  const { min, max, between, equals } = options

  if (typeof value === 'number') {
    if (isNaN(value)) {
      return err(numberError(value))
    }
    if (min !== undefined && min > value) {
      return err(`${JSON.stringify(value)} must be at least ${min}`)
    }
    if (max !== undefined && max < value) {
      return err(`${JSON.stringify(value)} must be <= ${max}`)
    }
    if (equals !== undefined && equals !== value) {
      return err(`${JSON.stringify(value)} must equal ${equals}`)
    } 
    if (between !== undefined) {
      return number({ min: between[0], max: between[1] }).validate(value)
    }
    return ok(value)
  }
  return err(numberError(value))
})

export default number