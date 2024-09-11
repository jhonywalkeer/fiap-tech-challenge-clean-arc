import { FindCategoryByIdDTO } from '@application/dtos/category'
import { FindCategoryByIdRepository } from '@application/repositories/category'
import { NotFoundByIdError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Category } from '@domain/entities'
import { StatusCode, ErrorName, Field } from '@domain/enums'
import { FindCategoryByIdUseCase } from '@domain/usecases/category'

export class FindCategoryByIdUC implements FindCategoryByIdUseCase {
  constructor(
    private readonly findCategoryByIdRepository: FindCategoryByIdRepository
  ) {}
  async execute(pathParameters: FindCategoryByIdDTO): Promise<Category> {
    const findCategory =
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
