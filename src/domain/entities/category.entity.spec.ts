import { Category } from './category.entity'

describe('Category', () => {
  it('should create a category', () => {
    const category = new Category('Category Name', 'Category Description')
    expect(category).toBeDefined()
    expect(category.name).toBe('Category Name')
    expect(category.description).toBe('Category Description')
  })

  it('should create a category with id', () => {
    const category = new Category(
      'Category Name',
      'Category Description',
      'cm01rzqek000008m7bgwl6vis'
    )
    expect(category).toBeDefined()
    expect(category.id).toBe('cm01rzqek000008m7bgwl6vis')
    expect(category.name).toBe('Category Name')
    expect(category.description).toBe('Category Description')
  })
})
