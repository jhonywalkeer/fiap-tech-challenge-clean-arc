import { FindCategoryByIdDTO } from '@application/dtos/category'
import { Category } from '@domain/entities'

export interface FindCategoryByIdUseCase {
  execute(pathParameters: FindCategoryByIdDTO): Promise<Category | null>
}
