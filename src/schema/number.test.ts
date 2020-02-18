import number from './number'

describe('number', () => {
  describe('#validate', () => {
    it('should accept a number that is not NaN', () => {
      const v = number()
      expect(v.validate(1).isOk()).toBe(true)
      expect(v.validate(NaN).isOk()).toBe(false)
    })
    
    it('should accept an min param', () => {
      const v = number({
        min: 10
      })

      expect(v.validate(10).isOk()).toBe(true)
      expect(v.validate(9).isOk()).toBe(false)
    })

    it('should accept a between param', () => {
      const v = number({
        between: [0, 100]
      })

      expect(v.validate(10).isOk()).toBe(true)
      expect(v.validate(101).isOk()).toBe(false)
    })
  })
})