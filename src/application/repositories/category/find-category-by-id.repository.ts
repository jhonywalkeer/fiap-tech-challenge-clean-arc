import { Repositories } from '@application/repositories/common'
import { FindByIdRepository } from '@common/types'
import { Category } from '@domain/entities'

export interface FindCategoryByIdRepository
  extends Omit<Repositories<Category | null>, FindByIdRepository> {}
