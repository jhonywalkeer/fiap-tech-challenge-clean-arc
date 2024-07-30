import { UpdateCategoryDTO } from '@application/dtos/category'
import { UpdateCategoryRepository } from '@application/repositories/category'
import { Category } from '@domain/entities'
import { UpdateCategoryUseCase } from '@domain/usecases/category'

export class UpdateCategoryUC implements UpdateCategoryUseCase {
  constructor(
    private readonly updateCategoryRepository: UpdateCategoryRepository
  ) {}
  async execute(pathParameters: UpdateCategoryDTO): Promise<Category | null> {
    return await this.updateCategoryRepository.update(pathParameters)
  }
}
