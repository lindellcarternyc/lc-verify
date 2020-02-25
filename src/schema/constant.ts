import { Schema } from './schema'
import { ok } from '../result/result'

const constant = <T>(value: T): Schema<T> => {
  return new Schema(_ => ok(value))
}

export default constant