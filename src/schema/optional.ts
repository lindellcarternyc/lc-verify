import { Schema } from './schema'
import { ok } from '../result/result'

const optional = <T>(schema: Schema<T>): Schema<T | undefined> => {
  return new Schema(value => {
    if (value === null) return ok<undefined>(undefined)
    if (value === undefined) return ok<undefined>(undefined)
    return schema.validate(value)
  })
}

export default optional