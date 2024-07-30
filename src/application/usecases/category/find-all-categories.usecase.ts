import { FindAllCategoriesDTO } from '@application/dtos/category'
import { FindAllCategoriesRepository } from '@application/repositories/category'
import { Category } from '@domain/entities'
import { FindAllCategoriesUseCase } from '@domain/usecases/category'

export class FindAllCategoriesUC implements FindAllCategoriesUseCase {
  constructor(
    private readonly findAllCategoriesRepository: FindAllCategoriesRepository
  ) {}
  async execute(
    queryParameters: FindAllCategoriesDTO
  ): Promise<Category[] | null> {
    return await this.findAllCategoriesRepository.findAll(queryParameters)
  }
}
