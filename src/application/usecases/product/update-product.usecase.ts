import { FindCategoryByIdRepository } from '@application/repositories/category'
import {
  FindProductByIdRepository,
  UpdateProductRepository
} from '@application/repositories/product'
import { ErrorName, StatusCode } from '@common/enums'
import { NotFoundByIdError, UpdateNotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Product } from '@domain/entities'
import { Field } from '@domain/enums'
import { UpdateProduct } from '@domain/interfaces/product'
import { UpdateProductUseCase } from '@domain/usecases/product'

export class UpdateProductUC implements UpdateProductUseCase {
  constructor(
    private readonly findProductByIdRepository: FindProductByIdRepository,
    private readonly findCategoryByIdRepository: FindCategoryByIdRepository,
    private readonly updateProductRepository: UpdateProductRepository
  ) {}
  async execute(payload: UpdateProduct): Promise<Product> {
    const findProduct = await this.findProductByIdRepository.findById(payload)

    if (!findProduct) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        NotFoundByIdError(Field.Product)
      )
    }

    const findCategory = await this.findCategoryByIdRepository.findById({
      id: payload.category_id
    })

    if (!findCategory) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        NotFoundByIdError(Field.Category)
      )
    }

    const updateProduct = await this.updateProductRepository.update({
      ...payload,
      category: findCategory
    })

    if (!updateProduct) {
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.BadRequest,
        UpdateNotOccurredError(Field.Product)
      )
    }

    return updateProduct
  }
}
