import { UpdateRepository } from '@common/types'
import { Repositories } from '@application/repositories/common'
import { Order } from '@domain/entities'

export interface UpdateOrderRepository
  extends Omit<Repositories<Order | null>, UpdateRepository> {}
