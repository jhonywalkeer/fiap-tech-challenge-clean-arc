import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { Product } from '@domain/entities'

export interface FindAllProductsUseCase {
  execute(
    queryParameters: PaginationAndFilter
  ): Promise<PaginateResponse<Product>>
}
