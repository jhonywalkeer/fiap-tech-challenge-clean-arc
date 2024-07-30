import { DeleteRepository } from '@common/types'
import { Repositories } from '@application/repositories/common'

export interface DeleteProductRepository
  extends Omit<Repositories<void>, DeleteRepository> {}
