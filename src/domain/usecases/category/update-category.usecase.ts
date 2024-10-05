import { Category } from '@domain/entities'
import { UpdateCategory } from '@domain/interfaces/category'

export interface UpdateCategoryUseCase {
  execute(payload: UpdateCategory): Promise<Category>
}
