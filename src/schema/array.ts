import { Schema } from './schema'
import { ok, err } from '../result/result'
import { primitiveError } from '../errors/errors'

const arrayError = (schemaName: string, index: number, error: string): string => {
  return `<${schemaName}> schema failed at index "${index}" with error: ${error}`
}
const array = <T>(schemaName: string, schema: Schema<T>): Schema<T[]> => {
  return new Schema(value => {
    if (Array.isArray(value)) {
      const arr: T[] = []
      for (let i = 0; i < value.length; i++) {
        const res = schema.validate(value[i])
        if (res.isOk()) {
          arr.push(res.value)
        } else {
          return err(arrayError(schemaName, i, res.error))
        }
      }
      return ok(arr)
    }
    return err(primitiveError('array')(value))
  })
}

export default array