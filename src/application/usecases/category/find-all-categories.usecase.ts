import { FindAllCategoriesRepository } from '@application/repositories/category'
import { ErrorName, StatusCode } from '@common/enums'
import { NotFoundAllError } from '@common/errors'
import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { HttpException } from '@common/utils/exceptions'
import { Category } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindAllCategoriesUseCase } from '@domain/usecases/category'

export class FindAllCategoriesUC implements FindAllCategoriesUseCase {
  constructor(
    private readonly findAllCategoriesRepository: FindAllCategoriesRepository
  ) {}
  async execute(
    queryParameters: PaginationAndFilter
  ): Promise<PaginateResponse<Category>> {
    const findCategories: PaginateResponse<Category> | null =
      await this.findAllCategoriesRepository.findAll(queryParameters)

    if (!findCategories) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        NotFoundAllError(Field.Category)
      )
    }

    return findCategories
  }
}
