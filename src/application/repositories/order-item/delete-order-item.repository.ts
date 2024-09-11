import { DeleteRepository } from '@common/types'
import { Repositories } from '@application/repositories/common'

export interface DeleteOrderItemRepository
  extends Omit<Repositories<void>, DeleteRepository> {}
