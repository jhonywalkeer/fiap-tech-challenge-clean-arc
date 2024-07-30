import { PaginationFilter } from '@common/utils/filters'

describe('[Utils] Pagination Filter', () => {
  it('should return default values when page or limit are not provided', () => {
    expect(PaginationFilter(NaN, NaN)).toEqual({ skip: 0, take: 10 })
    expect(PaginationFilter(1, NaN)).toEqual({ skip: 0, take: 10 })
    expect(PaginationFilter(NaN, 10)).toEqual({ skip: 0, take: 10 })
  })

  it('should return correct values when page and limit are provided', () => {
    expect(PaginationFilter(1, 10)).toEqual({ skip: 0, take: 10 })
    expect(PaginationFilter(2, 10)).toEqual({ skip: 10, take: 10 })
    expect(PaginationFilter(3, 5)).toEqual({ skip: 10, take: 5 })
  })
})
