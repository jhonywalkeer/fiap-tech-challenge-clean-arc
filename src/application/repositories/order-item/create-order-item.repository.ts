import { CreateRepository } from '@common/types'
import { Repositories } from '@application/repositories/common'
import { OrderItem } from '@domain/entities'

export interface CreateOrderItemRepository
  extends Omit<Repositories<OrderItem | OrderItem[]>, CreateRepository> {}
