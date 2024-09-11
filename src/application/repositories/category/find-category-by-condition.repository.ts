import { Repositories } from '@application/repositories/common'
import { FindByConditionRepository } from '@common/types'
import { Category } from '@domain/entities'

export interface FindCategoryByConditionRepository
  extends Omit<Repositories<Category[] | null>, FindByConditionRepository> {}
