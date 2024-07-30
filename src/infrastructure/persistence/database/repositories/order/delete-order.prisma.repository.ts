import { DeleteOrderDTO } from '@application/dtos/order'
import { DeleteOrderRepository } from '@application/repositories/order'
import { HttpException } from '@common/utils/exceptions'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindOrderByIdPrismaRepository } from './find-order-by-id.prisma.repository'

export class DeleteOrderPrismaRepository implements DeleteOrderRepository {
  constructor(
    private readonly prisma: DatabaseConnection,
    private readonly findOrderById: FindOrderByIdPrismaRepository
  ) {}

  async delete(pathParameters: DeleteOrderDTO): Promise<void> {
    const product = await this.findOrderById.findById({
      id: pathParameters.id
    })

    if (product === null) {
      throw new HttpException(
        StatusCode.NoContent,
        ErrorName.NotFoundInformation,
        ErrorMessage.OrderNotExists
      )
    }

    await this.prisma.product.delete({
      where: {
        id: pathParameters.id
      }
    })
  }
}
