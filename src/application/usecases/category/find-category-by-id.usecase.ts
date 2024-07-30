import { FindCategoryByIdDTO } from '@application/dtos/category'
import { FindCategoryByIdRepository } from '@application/repositories/category'
import { Category } from '@domain/entities'
import { FindCategoryByIdUseCase } from '@domain/usecases/category'

export class FindCategoryByIdUC implements FindCategoryByIdUseCase {
  constructor(
    private readonly findCategoryByIdRepository: FindCategoryByIdRepository
  ) {}
  async execute(pathParameters: FindCategoryByIdDTO): Promise<Category | null> {
    return await this.findCategoryByIdRepository.findById(pathParameters)
  }
}
