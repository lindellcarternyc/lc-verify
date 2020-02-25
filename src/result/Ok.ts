import { ResultClass } from './result'

export class Ok<T> extends ResultClass<T> {
  constructor(readonly value: T) { 
    super()
  }
  
  public map<U>(fn: (_: T) => U): ResultClass<U> {
    return new Ok(fn(this.value))
  }

  public isOk(): this is Ok<T> {
    return true
  }
}