import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { Order } from '@domain/entities'

export interface FindAllOrdersUseCase {
  execute(payload: PaginationAndFilter): Promise<PaginateResponse<Order>>
}
