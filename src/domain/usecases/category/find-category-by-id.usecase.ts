import { Identifier } from '@common/interfaces'
import { Category } from '@domain/entities'

export interface FindCategoryByIdUseCase {
  execute(pathParameters: Identifier): Promise<Category>
}
