import { CreateNotOccurredError } from './create-not-occurred.error'

describe('[Errors] Create Not Occurred ', () => {
  it('should return a string with the structured error based on the field provided', () => {
    expect(CreateNotOccurredError('user')).toBe(
      'Ao tentar criar user, não foi possivel realizar a operação!'
    )
  })
})
