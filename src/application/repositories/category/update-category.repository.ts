import { UpdateRepository } from '@common/types'
import { Repositories } from '@application/repositories/common'
import { Category } from '@domain/entities'

export interface UpdateCategoryRepository
  extends Omit<Repositories<Category | null>, UpdateRepository> {}
