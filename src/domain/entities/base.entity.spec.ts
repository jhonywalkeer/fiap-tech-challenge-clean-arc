import { Base } from '@domain/entities'

describe('[Entities] Base Entity', () => {
  it('should create an instance with name and id', () => {
    const base = new Base('Random Name', 'clyv0hcif000008l6ag57ca7z')
    expect(base).toBeDefined()
    expect(base.name).toBe('Random Name')
    expect(base.id).toBe('clyv0hcif000008l6ag57ca7z')
  })

  it('should create an instance with name only', () => {
    const base = new Base('Random Name')
    expect(base).toBeDefined()
    expect(base.name).toBe('Random Name')
    expect(base.id).toBeUndefined()
  })
})
