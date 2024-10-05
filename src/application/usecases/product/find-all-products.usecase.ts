import { FindAllProductRepository } from '@application/repositories/product'
import { ErrorName, StatusCode } from '@common/enums'
import { NotFoundAllError } from '@common/errors'
import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { HttpException } from '@common/utils/exceptions'
import { Product } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindAllProductsUseCase } from '@domain/usecases/product'

export class FindAllProductsUC implements FindAllProductsUseCase {
  constructor(
    private readonly findAllProductsRepository: FindAllProductRepository
  ) {}
  async execute(
    queryParameters: PaginationAndFilter
  ): Promise<PaginateResponse<Product>> {
    const findProducts: PaginateResponse<Product> | null =
      await this.findAllProductsRepository.findAll(queryParameters)

    if (!findProducts) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        NotFoundAllError(Field.Product)
      )
    }
    return findProducts
  }
}
