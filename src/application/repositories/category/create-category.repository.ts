import { CreateRepository } from '@common/types'
import { Repositories } from '@application/repositories/common'
import { Category } from '@domain/entities'

export interface CreateCategoryRepository
  extends Omit<Repositories<Category>, CreateRepository> {}
