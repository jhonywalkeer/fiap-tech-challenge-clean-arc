export class PaginateDTO {
  page: number
  limit: number
  sort?: string
  order?: string

  constructor(
    page: number = 1,
    limit: number = 10,
    sort?: string,
    order?: string
  ) {
    this.page = Number(page)
    this.limit = Number(limit)
    this.sort = sort
    this.order = order
  }
}
