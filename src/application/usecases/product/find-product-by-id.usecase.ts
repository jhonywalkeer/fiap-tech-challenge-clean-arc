import { FindProductByIdRepository } from '@application/repositories/product'
import { ErrorName, StatusCode } from '@common/enums'
import { NotFoundByIdError } from '@common/errors'
import { Identifier } from '@common/interfaces'
import { HttpException } from '@common/utils/exceptions'
import { Product } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindProductByIdUseCase } from '@domain/usecases/product'

export class FindProductByIdUC implements FindProductByIdUseCase {
  constructor(
    private readonly findProductByIdRepository: FindProductByIdRepository
  ) {}
  async execute(pathParameters: Identifier): Promise<Product> {
    const findProduct =
      await this.findProductByIdRepository.findById(pathParameters)

    if (!findProduct) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        NotFoundByIdError(Field.Product)
      )
    }

    return findProduct
  }
}
