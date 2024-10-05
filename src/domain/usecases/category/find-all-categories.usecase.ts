import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { Category } from '@domain/entities'

export interface FindAllCategoriesUseCase {
  execute(
    queryParameters: PaginationAndFilter
  ): Promise<PaginateResponse<Category>>
}
