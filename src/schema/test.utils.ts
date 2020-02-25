import { Result } from '../result'
import { Ok, Err } from '../result/result'

export const expectValue = <T>(expected: T, actual: Result<T>) => {
  expect(actual.isOk()).toBe(true)

  expect((actual as  Ok<T>).value).toEqual(expected)
}

export const expectError = (error: string, actual: Result<any>) => {
  expect(actual.isOk()).toBe(false)

  expect((actual as Err<any>).error).toContain(error)
}