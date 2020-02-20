import { Schema } from './schema'
import { ok } from '../result/result'

const succeed: Schema<any> = new Schema(value => {
  return ok(value)
})

export default succeed