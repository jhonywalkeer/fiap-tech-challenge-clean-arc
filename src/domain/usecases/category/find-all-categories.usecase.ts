import { FindAllCategoriesDTO } from '@application/dtos/category'
import { Category } from '@domain/entities'

export interface FindAllCategoriesUseCase {
  execute(queryParameters: FindAllCategoriesDTO): Promise<Category[] | null>
}
