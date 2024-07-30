import { IsCpfIdentify } from '@common/utils/identifiers'

describe('[Utils] Is CPF Identify', () => {
  it('should return false if the input string length is not 11', () => {
    const input = '1234567890'
    const result = IsCpfIdentify(input)
    expect(result).toEqual(false)
  })

  it('should return false if the input string contains non-numeric characters', () => {
    const input = '1234567890a'
    const result = IsCpfIdentify(input)
    expect(result).toEqual(false)
  })

  it('should return true if the input string is a valid CPF (11 numeric characters)', () => {
    const input = '12345678901'
    const result = IsCpfIdentify(input)
    expect(result).toEqual(true)
  })
})
