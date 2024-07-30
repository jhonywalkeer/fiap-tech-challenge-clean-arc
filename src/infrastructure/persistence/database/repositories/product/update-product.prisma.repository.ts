import { UpdateProductDTO } from '@application/dtos/product'
import { ProductMap } from '@application/mappers'
import { UpdateProductRepository } from '@application/repositories/product'
import { HttpException } from '@common/utils/exceptions'
import { Product } from '@domain/entities'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindProductByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/product'

export class UpdateProductPrismaRepository implements UpdateProductRepository {
  constructor(
    private readonly prisma: DatabaseConnection,
    private readonly findProductById: FindProductByIdPrismaRepository
  ) {}

  async update(pathParameters: UpdateProductDTO): Promise<Product | null> {
    const product = await this.findProductById.findById({
      id: pathParameters.id
    })

    const category = await this.prisma.category.findUnique({
      where: {
        id: pathParameters.category_id
      }
    })

    if (product === null) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        ErrorMessage.ProductNotFound
      )
    }

    if (category === null) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        ErrorMessage.CategoriesNotFound
      )
    }

    const update = await this.prisma.product.update({
      where: {
        id: pathParameters.id
      },
      data: {
        name: pathParameters.name ? pathParameters.name : product.name,
        price: pathParameters.price ? pathParameters.price : product.price,
        category_id: pathParameters.category_id
          ? pathParameters.category_id
          : product.category.id,
        description: pathParameters.description
          ? pathParameters.description
          : product.description
      }
    })

    const findProduct = await this.findProductById.findById({
      id: update.id
    })

    return ProductMap.execute(findProduct, findProduct?.category)
  }
}
