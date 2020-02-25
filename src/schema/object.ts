import { Schema } from './schema'
import { ok, err, Result } from '../result/result'
import { objectError, objectMappedKeyError, primitiveError } from '../errors/errors'

type SchemaObject<T extends Record<string, any>> = { [K in keyof Required<T>]: Schema<T[K]> }
type KeyMap<T extends Record<string, any>> = { [K in keyof Partial<T>]: string }

const object = <T extends Record<string, any>>(schemaName: string, schema: SchemaObject<T>, keyMap?: KeyMap<T>): Schema<T> => {
  const validatorKeys = Object.keys(schema)

  const resObj: any = {}
  const keyMapObj = keyMap || {} as KeyMap<T>

  const validateFunc: (_: any) =>  Result<T> = value => {
    for (const key of validatorKeys) {
      if (key in value) {
        const objValue = value[key]
        const validator = schema[key]
        const currentResult = validator.validate(objValue)
        if (currentResult.isOk()) {
          resObj[key] = currentResult.value
        } else {
          return err(objectError(schemaName)(key)(currentResult.error))
        }
      } else if (key in keyMapObj) {
        const mappedKey = keyMapObj[key]
        const objValue = value[mappedKey]
        const validator = schema[key]
        const currentResult = validator.validate(objValue)
        if (currentResult.isOk()) {
          resObj[key] = currentResult.value
        } else {
          const error = objectMappedKeyError(schemaName)(key)(mappedKey)(currentResult.error)
          return err(error)
        }
      } else {
        const error = primitiveError(schemaName)(value)
        return err(error)
      }
    }
    return ok(resObj)
  }
  
  return new Schema(validateFunc)
}

export default object