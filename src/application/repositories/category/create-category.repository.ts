import { Repositories } from '@application/repositories/common'
import { CreateRepository } from '@common/types'
import { Category } from '@domain/entities'

export interface CreateCategoryRepository
  extends Omit<Repositories<Category>, CreateRepository> {}
