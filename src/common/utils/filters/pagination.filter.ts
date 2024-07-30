export const PaginationFilter = (page: number, limit: number) => {
  if (!page || !limit) {
    return {
      skip: 0,
      take: 10
    }
  }

  return {
    skip: (page - 1) * limit,
    take: limit
  }
}
