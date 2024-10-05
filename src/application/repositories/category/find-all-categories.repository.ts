import { Repositories } from '@application/repositories/common'
import { FindAllRepository, PaginateResponse } from '@common/types'
import { Category } from '@domain/entities'

export interface FindAllCategoriesRepository
  extends Omit<
    Repositories<PaginateResponse<Category> | null>,
    FindAllRepository
  > {}
