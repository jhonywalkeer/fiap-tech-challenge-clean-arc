import { OrderIdentifierGenerator } from '@common/utils/generators'
import { Letters, Numbers } from '@common/constants'

describe('[Utils] Order Identifier Generator', () => {
  it('should return a string of length 6', () => {
    const result = OrderIdentifierGenerator()
    expect(result.length).toEqual(6)
  })

  it('should return a string with the third character as a dash', () => {
    const result = OrderIdentifierGenerator()
    expect(result.charAt(2)).toEqual('-')
  })

  it('should return a string with the first two characters as letters', () => {
    const result = OrderIdentifierGenerator()
    expect(Letters).toContain(result.charAt(0))
    expect(Letters).toContain(result.charAt(1))
  })

  it('should return a string with the last three characters as numbers', () => {
    const result = OrderIdentifierGenerator()
    expect(Numbers).toContain(result.charAt(3))
    expect(Numbers).toContain(result.charAt(4))
    expect(Numbers).toContain(result.charAt(5))
  })
})
