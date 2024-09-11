import { FindOrderItemByConditionDTO } from '@application/dtos/order-item'
import { FindOrderItemByConditionRepository } from '@application/repositories/order-item'
import { OrderItem } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindOrderItemByConditionPrismaRepository
  implements FindOrderItemByConditionRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async findByCondition(
    pathParameters: FindOrderItemByConditionDTO
  ): Promise<OrderItem[] | null> {
    try {
      return await this.prisma.order_item.findMany({
        where: {
          order_id: {
            in: pathParameters.ids
          }
        }
      })
    } catch (error) {
      return null
    }
  }
}
