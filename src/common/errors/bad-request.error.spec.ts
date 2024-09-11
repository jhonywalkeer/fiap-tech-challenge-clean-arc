import { BadRequestError } from './bad-request.error'

describe('[Errors] Bad Request ', () => {
  it('should return a string', () => {
    expect(BadRequestError()).toBe(
      'Body esperado precisa ser informado corretamente'
    )
  })
})
