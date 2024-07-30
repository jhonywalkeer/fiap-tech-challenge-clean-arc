import { RemoveDotsAndDashesFormat } from '@common/utils/formaters'

describe('[Utils] Remove Dots and Dashes Format', () => {
  it('should remove dots and dashes from the input string', () => {
    const input = '1.2.3-4'
    const expectedOutput = '1234'

    const result = RemoveDotsAndDashesFormat(input)

    expect(result).toEqual(expectedOutput)
  })

  it('should return the same string if there are no dots or dashes', () => {
    const input = '123'
    const expectedOutput = '123'

    const result = RemoveDotsAndDashesFormat(input)

    expect(result).toEqual(expectedOutput)
  })
})
