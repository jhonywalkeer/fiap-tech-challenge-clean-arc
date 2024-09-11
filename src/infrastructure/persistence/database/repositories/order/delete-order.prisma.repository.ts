import { DeleteOrderDTO } from '@application/dtos/order'
import { DeleteOrderRepository } from '@application/repositories/order'
import { HttpException } from '@common/utils/exceptions'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindOrderByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/order'

export class DeleteOrderPrismaRepository implements DeleteOrderRepository {
  constructor(
    private readonly prisma: DatabaseConnection,
    private readonly orderRepository: FindOrderByIdPrismaRepository
  ) {}

  async delete(pathParameters: DeleteOrderDTO): Promise<void> {
    try {
      const product = await this.orderRepository.findById({
        id: pathParameters.id
      })

      if (!product || product === null) {
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
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        'Ao tentar deletar um pedido, não foi possivel realizar a operação'
      )
    }
  }
}
