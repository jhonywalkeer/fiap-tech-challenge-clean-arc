import { FindAllCategoriesDTO } from '@application/dtos/category'
import { FindAllCategoriesRepository } from '@application/repositories/category'
import { NotFoundAllError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Category } from '@domain/entities'
import { StatusCode, ErrorName, Field } from '@domain/enums'
import { FindAllCategoriesUseCase } from '@domain/usecases/category'

export class FindAllCategoriesUC implements FindAllCategoriesUseCase {
  constructor(
    private readonly findAllCategoriesRepository: FindAllCategoriesRepository
  ) {}
  async execute(queryParameters: FindAllCategoriesDTO): Promise<Category[]> {
    const findCategories =
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
