import { FindByConditionRepository } from '@common/types'
import { Repositories } from '@application/repositories/common'
import { Order } from '@domain/entities'

export interface FindOrderByConditionRepository
  extends Omit<Repositories<Order | null>, FindByConditionRepository> {}
