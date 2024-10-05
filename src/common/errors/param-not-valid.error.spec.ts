import { ParamNotValidError } from './param-not-valid.error'

describe('[Errors] Param Not Valid', () => {
  it('should return a string', () => {
    expect(ParamNotValidError()).toBe(
      'Você deve fornecer pelo menos um parâmetro válido!'
    )
  })
})
