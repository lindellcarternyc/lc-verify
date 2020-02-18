import { ok, err, Ok, Err } from './result'

describe('ok', () => {
  it('should create an Ok value', () => {
    const value = ok('hello')
    expect(value.isOk()).toBe(true)
    expect(value instanceof Ok).toBe(true)
    expect((value as Ok<string>).value).toBe('hello')
  })

  describe('map', () => {
    it('should map over values', () => {
      const res = ok('hello')
      expect((res as Ok<string>).value).toBe('hello')

      expect((res.map(v => v.length) as Ok<number>).value).toBe(5)
    })
  })
})

describe('err', () => {
  it('should create an Err value', () => {
    const e = err('shit')
    expect(e.isOk()).toBe(false)
    expect(e instanceof Err).toBe(true)
  })

  describe('map', () => {
    it('should ignore a mapper function', () => {
      const e = err('hello')
      expect(e.isOk()).toBe(false)

      const mapper = jest.fn()
      const e2 = e.map(mapper)
      expect(mapper.mock.calls.length).toBe(0)

      expect(e2 instanceof Err).toBe(true)
      expect((e2 as Err<string>).error).toBe('hello')
    })
  })
})