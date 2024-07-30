import { UpdateCategoryDTO } from '@application/dtos/category'
import { Category } from '@domain/entities'

export interface UpdateCategoryUseCase {
  execute(pathParameters: UpdateCategoryDTO): Promise<Category | null>
}
