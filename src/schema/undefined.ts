import { Schema } from './schema'
import { ok, err } from '../result/result'

/**
 * Decoder that only succeeds when json is strictly (===) `undefined`.
 * When succeeds it returns `defaultValue`.
 *
 * @param defaultValue The value returned when json is `undefined`.
 */
const isUndefined = <T>(defaultValue: T): Schema<T> => {
  return new Schema(value => {
    if (value === undefined) return ok(defaultValue)
    return err(`${JSON.stringify(value)} is not undefined.`)
  })
}

export default isUndefined