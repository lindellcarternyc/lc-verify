import { ResultClass } from './result'
import { Ok } from './Ok'

export class Err<T> extends ResultClass<T> {
  constructor(readonly error: string) {
    super()
  }

  map<U>(_: (_: T) => U): ResultClass<U> {
    return new Err(this.error)
  }

  isOk(): this is Ok<T> {
    return false
  }
}