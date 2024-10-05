import { BadRequestError } from './bad-request.error'

describe('[Errors] Bad Request ', () => {
  it('must return a string with the structured error', () => {
    expect(BadRequestError()).toBe(
      'Body esperado precisa ser informado corretamente.'
    )
  })
})
