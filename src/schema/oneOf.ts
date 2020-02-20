import { Schema } from './schema'
import { err } from '../result/result'

const oneOfError = (schemaName: string) => (value: any): string => {
  return `<${schemaName}> schema failed because ${JSON.stringify(
    value
  )} can't be decoded with provided decoders`
}
const oneOf = <T extends any>(schemaName: string, schemaList: Array<Schema<T>>): Schema<T> => {
  const makeError = oneOfError(schemaName)

  return new Schema(value => {
    for (const schema of schemaList) {
      const result = schema.validate(value)
      if (result.isOk()) return result
    }
    return err(makeError(value))
  })
}

export default oneOf