import { FindByIdRepository } from '@common/types/repositories.type'
import { Repositories } from '@application/repositories/common'
import { OrderItem } from '@domain/entities'

export interface FindOrderItemByIdRepository
  extends Omit<Repositories<OrderItem[] | null>, FindByIdRepository> {}
