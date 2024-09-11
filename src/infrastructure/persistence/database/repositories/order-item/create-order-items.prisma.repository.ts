import { CreateOrderItemDTO } from '@application/dtos/order-item'
import { CreateOrderItemRepository } from '@application/repositories/order-item'
import { OrderItem } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { Prisma } from '@prisma/client'

export class CreateOrderItemPrismaRepository
  implements CreateOrderItemRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async create(
    body: CreateOrderItemDTO | CreateOrderItemDTO[]
  ): Promise<OrderItem[]> {
    try {
      const bodyArray = Array.isArray(body) ? body : [body]

      const createOrderItems: Prisma.BatchPayload =
        await this.prisma.order_item.createMany({
          data: bodyArray
        })

      const findOrderItems: OrderItem[] = await this.prisma.order_item.findMany(
        {
          where: {
            order_id: {
              in: bodyArray.map((item) => item.order_id)
            }
          }
        }
      )

      return findOrderItems
    } catch (error) {
      console.log(error)
      throw new Error(`error: ${error}`)
    }
  }
}
