import { FindOrderByIdDTO } from '@application/dtos/order'
import { FindOrderByIdRepository } from '@application/repositories/order'
import { FindProductByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/product'
import { FindOrderItemByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/order-item'
import { HttpException } from '@common/utils/exceptions'
import { Order } from '@domain/entities'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  OrderItemsSchema,
  OrderSchema,
  ProductWithCategorySchema
} from '@infrastructure/persistence/database/schemas'
import { OrderMap } from '@application/mappers/order.map'
import { EmptyFiller } from '@common/constants'

export class FindOrderByIdPrismaRepository implements FindOrderByIdRepository {
  constructor(
    private readonly prisma: DatabaseConnection,
    private readonly orderItemRepository: FindOrderItemByConditionPrismaRepository,
    private readonly productRepository: FindProductByConditionPrismaRepository
  ) {}

  async findById(pathParameters: FindOrderByIdDTO): Promise<Order | null> {
    try {
      const findOrder: OrderSchema | null = await this.prisma.order.findUnique({
        where: {
          id: pathParameters.id
        }
      })

      if (!findOrder || findOrder === null) {
        throw new HttpException(
          StatusCode.NotFound,
          ErrorName.NotFoundInformation,
          ErrorMessage.OrderNotFound
        )
      }

      const findItems: OrderItemsSchema[] | null =
        await this.orderItemRepository.findByCondition({
          ids: [findOrder?.id]
        })

      const findProducts: ProductWithCategorySchema[] | null =
        await this.productRepository.findByCondition({
          ids: findItems?.map((item) => item.product_id ?? EmptyFiller)
        })

      return OrderMap.execute(findOrder, findItems, findProducts)
    } catch (error) {
      console.info('FindOrderByIdPrismaRepository.findById: Not found order')
      return null
    }
  }
}
