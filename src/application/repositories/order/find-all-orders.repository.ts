import { FindAllRepository } from '@common/types'
import { Repositories } from '@application/repositories/common'
import { Order } from '@domain/entities'

export interface FindAllOrdersRepository
  extends Omit<Repositories<Order[] | null>, FindAllRepository> {}
