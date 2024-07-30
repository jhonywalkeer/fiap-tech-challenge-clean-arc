import { DeleteRepository } from '@common/types'
import { Repositories } from '@application/repositories/common'

export interface DeleteCategoryRepository
  extends Omit<Repositories<void>, DeleteRepository> {}
