import { Ok } from './Ok'
import { Err } from './Err'

export abstract class ResultClass<T> {
  abstract map<U>(fn: (_: T) => U): ResultClass<U>
  abstract isOk(): boolean
}


export type Result<A> = Ok<A> | Err<A>

export const ok = <A>(value: A): Result<A> => {
  return new Ok(value)
}

export const err = <A>(error: string): Result<A> => {
  return new Err(error)
}