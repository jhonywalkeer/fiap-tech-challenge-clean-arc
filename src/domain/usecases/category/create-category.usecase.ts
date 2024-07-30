import { CreateCategoryDTO } from '@application/dtos/category'
import { Category } from '@domain/entities'

export interface CreateCategoryUseCase {
  execute(body: CreateCategoryDTO): Promise<Category> | never
}
