import { Schema } from './schema'
import { ok, err } from '../result/result'
import { primitiveError } from '../errors/errors'

const bool = (): Schema<boolean> => {
  return new Schema(value => {
    if (value === true || value === false) {
      return ok(value)
    }
    return err(primitiveError('boolean')(value))
  })
}

export default bool