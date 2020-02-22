import { Schema } from './schema'
import { ok, err } from '../result'

const isNull = <T>(defaultValue: T): Schema<T> => {
  return new Schema(value => {
    if (value === null) return ok(defaultValue)
    return err(`${value} is not strictly equal (===) to null`)
  })
}

export default isNull
