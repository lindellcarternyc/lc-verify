import { Result } from '../result'
import { ok, err } from '../result/result'
import { primitiveError } from '../errors/errors'

interface ISchema<T> {
  validate: (_: any) => Result<T>
  validateAsync: (_: any) => Promise<T>
  onValidate: <U>(_: any, onOk: (_: T) => U, onErr: (err: string) => U) => U
  map: <U>(fn: (_: T) => U) => ISchema<U>
  then: <U>(fn: (_: T) => ISchema<U>) => ISchema<U>
}

export class Schema<T> implements ISchema<T> {
  constructor(readonly validate: (_: any) => Result<T>) { }

  public validateAsync(value: any): Promise<T> {
    return new Promise((res, rej) => {
      const result = this.validate(value)
      if (result.isOk()) {
        return res(result.value)
      }
      return rej(result.error)
    })
  }

  public onValidate<U>(value: any, onOk: (value: T) => U, onErr: (error: string) => U): U {
    const result = this.validate(value)
    if (result.isOk()) {
      return onOk(result.value)
    }
    return onErr(result.error)
  }

  public map<U>(fn: (value: T) => U): Schema<U> {
    return new Schema<U>(value => {
      const result = this.validate(value)
      if (result.isOk()) {
        return ok(fn(result.value))
      }
      return err(result.error)
    })
  }

  public then<U>(fn: (value: T) => Schema<U>) {
    return new Schema<U>(value => {
      const result = this.validate(value)
      if (result.isOk()) {
        return fn(result.value).validate(value)
      }
      return err(result.error)
    })
  }
}

export const lazy = <T>(fn: () => Schema<T>): Schema<T> => {
  return new Schema(value => fn().validate(value))
}
