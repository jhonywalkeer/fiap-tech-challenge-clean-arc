import { ProductAndCategoryMap } from '@application/mappers'
import { FindProductByConditionRepository } from '@application/repositories/product'
import { ErrorName, StatusCode } from '@common/enums'
import { FindNotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Product } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindProductByCondition } from '@domain/interfaces/product'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindProductByConditionPrismaRepository
  implements FindProductByConditionRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async findByCondition(
    pathParameters: FindProductByCondition
  ): Promise<Product[] | null> {
    try {
      const findby = pathParameters.ids
        ? {
            id: {
              in: pathParameters.ids
            }
          }
        : { name: pathParameters.name }

      const findProduct = await this.prisma.product.findMany({
        where: findby,
        include: { category: true }
      })

      return !findProduct || findProduct.length === 0
        ? null
        : findProduct.map((product) => {
            return ProductAndCategoryMap.execute(product, product.category)
          })
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        FindNotOccurredError(Field.Product)
      )
    }
  }
}
