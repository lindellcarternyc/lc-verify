export class Ok<A> {
  constructor(readonly value: A) { }

  map<B>(fn: (_: A) => B): Result<B> {
    return new Ok(fn(this.value))
  }

  isOk(): this is Ok<A> {
    return true
  }
}

export class Err<A> {
  constructor(readonly error: string) { }

  map<B>(_: (_: A) => B): Result<B> {
    return new Err(this.error)
  }

  isOk<A>(): this is Ok<A> {
    return false
  }
}

export type Result<A> = Ok<A> | Err<A>

export const ok = <A>(value: A): Result<A> => {
  return new Ok(value)
}

export const err = <A>(error: string): Result<A> => {
  return new Err(error)
}