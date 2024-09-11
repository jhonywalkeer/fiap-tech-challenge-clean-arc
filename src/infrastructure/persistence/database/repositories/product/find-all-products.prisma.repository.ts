import { FindAllProductsDTO } from '@application/dtos/product'
import { ProductAndCategoryMap } from '@application/mappers'
import { FindAllProductRepository } from '@application/repositories/product'
import { Product } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindAllProductsPrismaRepository
  implements FindAllProductRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async findAll(
    queryParameters: FindAllProductsDTO
  ): Promise<Product[] | null> {
    const page = queryParameters.page
    const limit = queryParameters.limit

    console.log(page, limit)
    const findProduct = await this.prisma.product.findMany({
      include: { category: true }
    })

    const formatProductAndCategory = findProduct.map((product) => {
      return ProductAndCategoryMap.execute(product, product.category)
    })

    return formatProductAndCategory
  }
}
