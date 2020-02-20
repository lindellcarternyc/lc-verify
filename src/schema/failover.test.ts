import failover from './failover'
import succeed from './succeed'
import { Schema } from './schema'

describe('failover', () => {
  it('should be a curried function', () => {
    expect(typeof failover(succeed)).toEqual('function')
    expect(failover(succeed, null)).toBeInstanceOf(Schema)
  })
})