import {
  CreateCategoryRepository,
  FindCategoryByConditionRepository
} from '@application/repositories/category'
import { ErrorName, StatusCode } from '@common/enums'
import { ExistsError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Category } from '@domain/entities'
import { Field } from '@domain/enums'
import { CreateCategory } from '@domain/interfaces/category'
import { CreateCategoryUseCase } from '@domain/usecases/category'

export class CreateCategoryUC implements CreateCategoryUseCase {
  constructor(
    private readonly findCategoryByConditionRepository: FindCategoryByConditionRepository,
    private readonly createCategoryRepository: CreateCategoryRepository
  ) {}
  async execute(payload: CreateCategory): Promise<Category> {
    const findCategory =
      await this.findCategoryByConditionRepository.findByCondition(payload)

    if (findCategory) {
      throw new HttpException(
        StatusCode.Conflict,
        ErrorName.ResourceAlreadyExists,
        ExistsError(Field.Category)
      )
    }

    return await this.createCategoryRepository.create(payload)
  }
}
