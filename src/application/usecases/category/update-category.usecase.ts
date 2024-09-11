import { UpdateCategoryDTO } from '@application/dtos/category'
import {
  FindCategoryByIdRepository,
  UpdateCategoryRepository
} from '@application/repositories/category'
import { NotFoundByIdError, UpdateNotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Category } from '@domain/entities'
import { StatusCode, ErrorName, Field } from '@domain/enums'
import { UpdateCategoryUseCase } from '@domain/usecases/category'

export class UpdateCategoryUC implements UpdateCategoryUseCase {
  constructor(
    private readonly findCategoryByIdRepository: FindCategoryByIdRepository,
    private readonly updateCategoryRepository: UpdateCategoryRepository
  ) {}
  async execute(pathParameters: UpdateCategoryDTO): Promise<Category> {
    const findCategory = await this.findCategoryByIdRepository.findById({
      id: pathParameters.id
    })

    if (!findCategory || findCategory === null) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        NotFoundByIdError(Field.Category)
      )
    }

    const updateCategory = await this.updateCategoryRepository.update({
      id: pathParameters.id,
      name: pathParameters.name ? pathParameters.name : findCategory.name,
      description: pathParameters.description
        ? pathParameters.description
        : findCategory.description
    })

    if (!updateCategory || updateCategory === null) {
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.BadRequest,
        UpdateNotOccurredError(Field.Category)
      )
    }

    return updateCategory
  }
}
