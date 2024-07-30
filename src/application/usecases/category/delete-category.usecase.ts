import { DeleteCategoryDTO } from '@application/dtos/category'
import { DeleteCategoryRepository } from '@application/repositories/category'
import { DeleteCategoryUseCase } from '@domain/usecases/category'

export class DeleteCategoryUC implements DeleteCategoryUseCase {
  constructor(
    private readonly deleteCategoryRepository: DeleteCategoryRepository
  ) {}
  async execute(pathParameters: DeleteCategoryDTO): Promise<void> {
    return await this.deleteCategoryRepository.delete(pathParameters)
  }
}
