import { DeleteProductDTO } from '@application/dtos/product'
import {
  DeleteProductRepository,
  FindProductByIdRepository
} from '@application/repositories/product'
import { ErrorName, StatusCode } from '@common/enums'
import { DeleteOrNotExistsError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Product } from '@domain/entities'
import { Field } from '@domain/enums'
import { DeleteProductUseCase } from '@domain/usecases/product'

export class DeleteProductUC implements DeleteProductUseCase {
  constructor(
    private readonly findProductByIdRepository: FindProductByIdRepository,
    private readonly deleteProductRepository: DeleteProductRepository
  ) {}
  async execute(pathParameters: DeleteProductDTO): Promise<void> {
    const findProduct: Product | null =
      await this.findProductByIdRepository.findById(pathParameters)

    if (!findProduct) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        DeleteOrNotExistsError(Field.Product)
      )
    }
    return await this.deleteProductRepository.delete(pathParameters)
  }
}
