import { FindProductByConditionDTO } from '@application/dtos/product/find-product-by-condition.dto'
import { ProductAndCategoryMap } from '@application/mappers'
import { FindProductByConditionRepository } from '@application/repositories/product'
import { HttpException } from '@common/utils/exceptions'
import { Product } from '@domain/entities'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindProductByConditionPrismaRepository
  implements FindProductByConditionRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async findByCondition(
    pathParameters: FindProductByConditionDTO
  ): Promise<Product[] | null> {
    try {
      const findProduct = await this.prisma.product.findMany({
        where: {
          id: {
            in: pathParameters.ids
          }
        },
        include: { category: true }
      })

      if (!findProduct || findProduct === null) {
        throw new HttpException(
          StatusCode.NotFound,
          ErrorName.NotFoundInformation,
          ErrorMessage.ProductsNotFound
        )
      }

      const formatProductAndCategory = findProduct.map((product) => {
        return ProductAndCategoryMap.execute(product, product.category)
      })

      return formatProductAndCategory
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        `error: ${error}`
      )
    }
  }
}
