import { ProductAndCategoryMap } from '@application/mappers'
import { CreateProductRepository } from '@application/repositories/product'
import { ErrorName, StatusCode } from '@common/enums'
import { CreateNotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Product } from '@domain/entities'
import { Field } from '@domain/enums'
import { CreateProduct } from '@domain/interfaces/product'
import { DatabaseConnection } from '@infrastructure/persistence/database'
export class CreateProductPrismaRepository implements CreateProductRepository {
  constructor(private readonly prisma: DatabaseConnection) {}

  async create(payload: CreateProduct): Promise<Product> {
    try {
      const createProduct = await this.prisma.product.create({
        data: {
          name: payload.name,
          description: payload.description,
          category_id: payload.category_id,
          price: payload.price,
          size: payload.size
        }
      })

      return ProductAndCategoryMap.execute(createProduct, payload.category)
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        CreateNotOccurredError(Field.Product)
      )
    }
  }
}
