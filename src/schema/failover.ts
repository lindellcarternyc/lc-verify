import { Schema } from './schema'
import { ok } from '../result/result'

// const failover = <T>(schama: Schema<T>) => (defaultValue: T): Schema<T> => {
//   return new Schema(value => {
//     const result = schama.validate(value)
//     if (result.isOk()) return result
//     return ok(defaultValue)
//   })
// }

const makeFailover = <T>(args: {
  schema: Schema<T>,
  defaultValue: T
}): Schema<T> => {
  return new Schema(value => {
    const result = args.schema.validate(value)
    if (result.isOk()) return result
    return ok(args.defaultValue)
  })
}
function failover<T>(schema: Schema<T>): (defaultValue: T) => Schema<T>
function failover<T>(schema: Schema<T>, defaultValue: T): Schema<T>
function failover<T>(schema: Schema<T>, defaultValue?: T): ((_: T) => Schema<T>) | Schema<T> {
  if (arguments.length === 2) return makeFailover({
    schema,
    defaultValue: defaultValue!
  })

  return value => makeFailover({
    schema,
    defaultValue: value
  })
}

export default failover