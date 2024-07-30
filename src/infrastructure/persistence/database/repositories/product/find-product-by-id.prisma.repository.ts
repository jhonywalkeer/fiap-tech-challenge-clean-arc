import { FindProductByIdDTO } from '@application/dtos/product'
import { ProductMap } from '@application/mappers'
import { FindProductByIdRepository } from '@application/repositories/product'
import { Product } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindProductByIdPrismaRepository
  implements FindProductByIdRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async findById(pathParameters: FindProductByIdDTO): Promise<Product | null> {
    const findProduct = await this.prisma.product.findFirst({
      where: {
        id: pathParameters.id
      },
      include: { category: true }
    })
    const formatProductAndCategory = ProductMap.execute(
      findProduct,
      findProduct?.category
    )

    return formatProductAndCategory
  }
}
