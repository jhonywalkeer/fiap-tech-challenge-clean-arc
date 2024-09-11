import { Base } from '@domain/entities'

describe('[Entities] Base Entity', () => {
  it('should create an instance with name and id', () => {
    const base = new Base('Random Name', 'cm01rzqek000008m7bgwl6vis')
    expect(base).toBeDefined()
    expect(base.name).toBe('Random Name')
    expect(base.id).toBe('cm01rzqek000008m7bgwl6vis')
  })

  it('should create an instance with name only', () => {
    const base = new Base('Random Name')
    expect(base).toBeDefined()
    expect(base.name).toBe('Random Name')
    expect(base.id).toBeUndefined()
  })
})
