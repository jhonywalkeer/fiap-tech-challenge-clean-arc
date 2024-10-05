import { Category } from '@domain/entities'
import { CreateCategory } from '@domain/interfaces/category'

export interface CreateCategoryUseCase {
  execute(payload: CreateCategory): Promise<Category>
}
