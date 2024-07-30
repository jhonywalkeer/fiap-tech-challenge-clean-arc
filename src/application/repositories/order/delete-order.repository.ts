import { DeleteRepository } from '@common/types'
import { Repositories } from '@application/repositories/common'

export interface DeleteOrderRepository
  extends Omit<Repositories<void>, DeleteRepository> {}
