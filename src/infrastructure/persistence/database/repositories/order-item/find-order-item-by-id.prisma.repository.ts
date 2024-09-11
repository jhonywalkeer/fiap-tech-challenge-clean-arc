import { FindOrderItemByIdRepository } from '@application/repositories/order-item'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { OrderItem } from '@domain/entities'
import { FindOrderItemByIdDTO } from '@application/dtos/order-item'
import { HttpException } from '@common/utils/exceptions'
import { ErrorName, Field, StatusCode } from '@domain/enums'
import { DeleteNotOccurredExceptionMessage } from '@common/constants'

export class FindOrderItemByIdPrismaRepository
  implements FindOrderItemByIdRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async findById(
    pathParameters: FindOrderItemByIdDTO
  ): Promise<OrderItem[] | null> {
    try {
      return await this.prisma.order_item.findMany({
        where: {
          id: pathParameters.id
        }
      })
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        DeleteNotOccurredExceptionMessage(Field.OrderItem)
      )
    }
  }
}
