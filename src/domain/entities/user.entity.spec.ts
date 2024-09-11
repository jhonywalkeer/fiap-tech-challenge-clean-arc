import { User } from './user.entity'

describe('User', () => {
  it('should create a user', () => {
    const user = new User('User Name', 'username@teste.com', '12345678901')
    expect(user).toBeDefined()
    expect(user.name).toBe('User Name')
    expect(user.email).toBe('username@teste.com')
    expect(user.social_security_number).toBe('12345678901')
  })

  it('should create a user with id', () => {
    const user = new User(
      'User Name',
      'username@teste.com',
      '12345678901',
      'cm01rzqek000008m7bgwl6vis'
    )
    expect(user).toBeDefined()
    expect(user.id).toBe('cm01rzqek000008m7bgwl6vis')
    expect(user.name).toBe('User Name')
    expect(user.email).toBe('username@teste.com')
    expect(user.social_security_number).toBe('12345678901')
  })
})
