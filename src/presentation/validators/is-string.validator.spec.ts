import { IsStringValidator } from './is-string.validator'

describe('[Validators] Is String', () => {
  it('should return a string', () => {
    const value = '1'
    const identifier = 'exemple_identifier'
    const result = IsStringValidator(value, identifier)
    expect(result).toBe(value)
  })

  it('should throw an error when the value is not a string', () => {
    const value = 1
    const identifier = 'exemple_identifier'
    expect(() => IsStringValidator(value, identifier)).toThrow()
  })
})
