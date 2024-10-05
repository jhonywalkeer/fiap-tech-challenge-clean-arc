import {
  FindCategoryByIdRepository,
  UpdateCategoryRepository
} from '@application/repositories/category'
import { ErrorName, StatusCode } from '@common/enums'
import { NotFoundByIdError, UpdateNotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Category } from '@domain/entities'
import { Field } from '@domain/enums'
import { UpdateCategory } from '@domain/interfaces/category'
import { UpdateCategoryUseCase } from '@domain/usecases/category'

export class UpdateCategoryUC implements UpdateCategoryUseCase {
  constructor(
    private readonly findCategoryByIdRepository: FindCategoryByIdRepository,
    private readonly updateCategoryRepository: UpdateCategoryRepository
  ) {}
  async execute(payload: UpdateCategory): Promise<Category> {
    const findCategory = await this.findCategoryByIdRepository.findById(payload)

    if (!findCategory) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        NotFoundByIdError(Field.Category)
      )
    }

    const updateCategory = await this.updateCategoryRepository.update({
      id: payload.id,
      name: payload.name ? payload.name : findCategory.name,
      description: payload.description
        ? payload.description
        : findCategory.description
    })

    if (!updateCategory) {
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.BadRequest,
        UpdateNotOccurredError(Field.Category)
      )
    }

    return updateCategory
  }
}
