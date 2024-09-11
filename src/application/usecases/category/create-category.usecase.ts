import { CreateCategoryDTO } from '@application/dtos/category'
import { CreateCategoryRepository } from '@application/repositories/category'
import { CreateCategoryUseCase } from '@domain/usecases/category'
import { Category } from '@domain/entities'
import { FindCategoryByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/category'
import { HttpException } from '@common/utils/exceptions'
import { StatusCode, ErrorName, Field } from '@domain/enums'
import { ExistsError } from '@common/errors'

export class CreateCategoryUC implements CreateCategoryUseCase {
  constructor(
    private readonly findCategoryByConditionRepository: FindCategoryByConditionPrismaRepository,
    private readonly createCategoryRepository: CreateCategoryRepository
  ) {}
  async execute(body: CreateCategoryDTO): Promise<Category> {
    const findCategory =
      await this.findCategoryByConditionRepository.findByCondition({
        name: body.name
      })

    if (findCategory && findCategory?.length > 0) {
      throw new HttpException(
        StatusCode.Conflict,
        ErrorName.ResourceAlreadyExists,
        ExistsError(Field.Category)
      )
    }

    return await this.createCategoryRepository.create(body)
  }
}
