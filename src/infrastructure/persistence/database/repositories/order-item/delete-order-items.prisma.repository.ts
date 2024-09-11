import { DeleteOrderItemRepository } from '@application/repositories/order-item/delete-order-item.repository'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { HttpException } from '@common/utils/exceptions'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { DeleteOrderItemDTO } from '@application/dtos/order-item'
import { FindOrderItemByIdPrismaRepository } from './find-order-item-by-id.prisma.repository'

export class DeleteOrderItemPrismaRepository
  implements DeleteOrderItemRepository
{
  constructor(
    private readonly prisma: DatabaseConnection,
    private readonly orderItemRepository: FindOrderItemByIdPrismaRepository
  ) {}

  async delete(pathParameters: DeleteOrderItemDTO): Promise<void> {
    const orderItems = await this.orderItemRepository.findById({
      id: pathParameters.id
    })

    if (!orderItems || orderItems === null) {
      throw new HttpException(
        StatusCode.NoContent,
        ErrorName.NotFoundInformation,
        ErrorMessage.OrderItemNotExists
      )
    }

    await this.prisma.product.deleteMany({
      where: {
        id: pathParameters.id
      }
    })
  }
}
