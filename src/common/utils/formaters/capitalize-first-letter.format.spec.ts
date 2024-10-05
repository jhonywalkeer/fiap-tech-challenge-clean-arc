import { CapitalizeFirstLetterFormat } from './capitalize-first-letter.format'

describe('CapitalizeFirstLetterFormat', () => {
  it('should capitalize the first letter of a word', () => {
    expect(CapitalizeFirstLetterFormat('word')).toBe('Word')
  })
})
