import { CreateCategoryDTO } from '@application/dtos/category'
import { CreateCategoryRepository } from '@application/repositories/category'
import { CreateCategoryUseCase } from '@domain/usecases/category'
import { Category } from '@domain/entities'

export class CreateCategoryUC implements CreateCategoryUseCase {
  constructor(
    private readonly createCategoryRepository: CreateCategoryRepository
  ) {}
  async execute(body: CreateCategoryDTO): Promise<Category> | never {
    return await this.createCategoryRepository.create(body)
  }
}
