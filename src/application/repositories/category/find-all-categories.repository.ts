import { FindAllRepository } from '@common/types'
import { Repositories } from '@application/repositories/common'
import { Category } from '@domain/entities'

export interface FindAllCategoriesRepository
  extends Omit<Repositories<Category[] | null>, FindAllRepository> {}
