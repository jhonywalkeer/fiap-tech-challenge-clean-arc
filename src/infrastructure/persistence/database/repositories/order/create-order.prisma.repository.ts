import { CreateOrderDTO } from '@application/dtos/order'
import { CreateOrderRepository } from '@application/repositories/order'
import { HttpException } from '@common/utils/exceptions'
import { Order } from '@domain/entities'
import { ErrorMessage, ErrorName, StatusCode } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindOrderByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/order'

export class CreateOrderPrismaRepository implements CreateOrderRepository {
  constructor(
    private readonly prisma: DatabaseConnection,
    private readonly orderRepository: FindOrderByIdPrismaRepository
  ) {}

  async create(body: CreateOrderDTO): Promise<Order> {
    try {
      const createOrder = await this.prisma.order.create({
        data: {
          order: body.order,
          status: body.status,
          customer: body.customer,
          user_id: body.user_id,
          observation: body.observation
        }
      })

      const identifyOrder = await this.orderRepository.findById({
        id: createOrder.id
      })

      if (!identifyOrder) {
        throw new HttpException(
          StatusCode.NotFound,
          ErrorName.NotFoundInformation,
          ErrorMessage.OrderNotFound
        )
      }

      return {
        id: identifyOrder.id,
        order: identifyOrder.order,
        status: identifyOrder.status,
        items: identifyOrder.items,
        customer: identifyOrder.customer,
        observation: identifyOrder.observation
      }
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        `error: ${error}`
      )
    }
  }
}
