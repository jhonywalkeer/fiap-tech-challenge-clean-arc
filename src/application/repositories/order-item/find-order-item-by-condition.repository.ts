import { FindByConditionRepository } from '@common/types'
import { Repositories } from '@application/repositories/common'
import { OrderItem } from '@domain/entities'

export interface FindOrderItemByConditionRepository
  extends Omit<Repositories<OrderItem[] | null>, FindByConditionRepository> {}
