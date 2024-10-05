import { Repositories } from '@application/repositories/common'
import { FindAllRepository, PaginateResponse } from '@common/types'
import { Order } from '@domain/entities'

export interface FindAllOrdersRepository
  extends Omit<
    Repositories<PaginateResponse<Order> | null>,
    FindAllRepository
  > {}
