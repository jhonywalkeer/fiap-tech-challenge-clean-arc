import {
  DeleteCategoryRepository,
  FindCategoryByIdRepository
} from '@application/repositories/category'
import { ErrorName, StatusCode } from '@common/enums'
import { DeleteOrNotExistsError } from '@common/errors'
import { Identifier } from '@common/interfaces'
import { HttpException } from '@common/utils/exceptions'
import { Field } from '@domain/enums'
import { DeleteCategoryUseCase } from '@domain/usecases/category'

export class DeleteCategoryUC implements DeleteCategoryUseCase {
  constructor(
    private readonly findCategoryByIdRepository: FindCategoryByIdRepository,
    private readonly deleteCategoryRepository: DeleteCategoryRepository
  ) {}
  async execute(pathParameters: Identifier): Promise<void> {
    const findCategory =
      await this.findCategoryByIdRepository.findById(pathParameters)

    if (findCategory === null) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        DeleteOrNotExistsError(Field.Category)
      )
    }

    return await this.deleteCategoryRepository.delete(pathParameters)
  }
}
