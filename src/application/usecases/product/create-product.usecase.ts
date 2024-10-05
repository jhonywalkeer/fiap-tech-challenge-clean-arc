import { FindCategoryByIdRepository } from '@application/repositories/category'
import {
  CreateProductRepository,
  FindProductByConditionRepository
} from '@application/repositories/product'
import { StatusCode, ErrorName } from '@common/enums'
import { ExistsError, NotFoundByIdError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Product } from '@domain/entities'
import { Field } from '@domain/enums'
import { CreateProduct } from '@domain/interfaces/product'
import { CreateProductUseCase } from '@domain/usecases/product'

export class CreateProductUC implements CreateProductUseCase {
  constructor(
    private readonly findProductByConditionRepository: FindProductByConditionRepository,
    private readonly findCategoryByIdRepository: FindCategoryByIdRepository,
    private readonly createProductRepository: CreateProductRepository
  ) {}
  async execute(payload: CreateProduct): Promise<Product> {
    const findProduct =
      await this.findProductByConditionRepository.findByCondition(payload)

    if (findProduct) {
      throw new HttpException(
        StatusCode.Conflict,
        ErrorName.ResourceAlreadyExists,
        ExistsError(Field.Product)
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

    return await this.createProductRepository.create({
      ...payload,
      category: findCategory
    })
  }
}
