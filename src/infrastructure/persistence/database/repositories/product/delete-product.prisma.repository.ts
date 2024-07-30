import { DeleteProductDTO } from '@application/dtos/product'
import { DeleteProductRepository } from '@application/repositories/product'
import { HttpException } from '@common/utils/exceptions'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindProductByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/product'

export class DeleteProductPrismaRepository implements DeleteProductRepository {
  constructor(
    private readonly prisma: DatabaseConnection,
    private readonly findProductById: FindProductByIdPrismaRepository
  ) {}

  async delete(pathParameters: DeleteProductDTO): Promise<void> {
    const product = await this.findProductById.findById({
      id: pathParameters.id
    })

    if (product === null) {
      throw new HttpException(
        StatusCode.NoContent,
        ErrorName.NotFoundInformation,
        ErrorMessage.ProductNotExists
      )
    }

    await this.prisma.product.delete({
      where: {
        id: pathParameters.id
      }
    })
  }
}
