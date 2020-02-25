import { Schema } from './schema'
import { ok } from '../result/result'

describe('Schema', () => {
  it('should create a schema', () => {
    const s = new Schema(_ => ok(void {}))
    expect(s instanceof Schema).toBe(true)

    expect(s.validate).not.toBe(undefined)
  })
})