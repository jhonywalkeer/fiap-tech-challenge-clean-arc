import { FindCategoryByIdRepository } from '@application/repositories/category'
import { ErrorName, StatusCode } from '@common/enums'
import { NotFoundByIdError } from '@common/errors'
import { Identifier } from '@common/interfaces'
import { HttpException } from '@common/utils/exceptions'
import { Category } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindCategoryByIdUseCase } from '@domain/usecases/category'

export class FindCategoryByIdUC implements FindCategoryByIdUseCase {
  constructor(
    private readonly findCategoryByIdRepository: FindCategoryByIdRepository
  ) {}
  async execute(pathParameters: Identifier): Promise<Category> {
    const findCategory: Category | null =
      await this.findCategoryByIdRepository.findById(pathParameters)

    if (!findCategory) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        NotFoundByIdError(Field.Category)
      )
    }

    return findCategory
  }
}
