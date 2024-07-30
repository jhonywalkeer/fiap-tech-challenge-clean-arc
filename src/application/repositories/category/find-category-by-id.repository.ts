import { FindByIdRepository } from '@common/types'
import { Repositories } from '@application/repositories/common'
import { Category } from '@domain/entities'

export interface FindCategoryByIdRepository
  extends Omit<Repositories<Category | null>, FindByIdRepository> {}
