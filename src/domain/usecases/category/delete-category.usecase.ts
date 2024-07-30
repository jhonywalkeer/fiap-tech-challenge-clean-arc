import { DeleteCategoryDTO } from '@application/dtos/category'

export interface DeleteCategoryUseCase {
  execute(pathParameters: DeleteCategoryDTO): Promise<void>
}
