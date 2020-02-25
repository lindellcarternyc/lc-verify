import { Schema } from './schema'
import { ok, err } from '../result/result'

/**
 * Decoder that only succeeds when value strict equals (===) provided value.
 * 
 * @param exactValue: T
 * @returns Schema<T>
 */
const isExactly = <T>(exactValue: T): Schema<T> => {
  return new Schema(value => {
    if (value === exactValue) return ok(value)
    return err(`${JSON.stringify(value)} is not exactly ${JSON.stringify(exactValue)}`)
  })
}

export default isExactly