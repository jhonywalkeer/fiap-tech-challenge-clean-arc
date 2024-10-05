import {
  CreateOrderWithItemsMap,
  OrderItemsWithProductsMap
} from '@application/mappers'
import { OrderWithItemsMap } from '@application/mappers/order-with-items.map'
import { CreateOrderRepository } from '@application/repositories/order'
import { CreateOrderItemRepository } from '@application/repositories/order-item'
import { FindProductByConditionRepository } from '@application/repositories/product'
import { FindUserByIdRepository } from '@application/repositories/user'
import { CustumerNameFiller, ObservationFiller } from '@common/constants'
import { ErrorName, StatusCode } from '@common/enums'
import { NotFoundAllError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { OrderIdentifierGenerator } from '@common/utils/generators'
import { IsCpfIdentify } from '@common/utils/identifiers'
import { Order, OrderItem, Product, User } from '@domain/entities'
import { Field, OrderStatus } from '@domain/enums'
import { CreateOrderWithItems } from '@domain/interfaces/order'
import { CreateOrderUseCase } from '@domain/usecases/order'
export class CreateOrderUC implements CreateOrderUseCase {
  constructor(
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly findProductByConditionRepository: FindProductByConditionRepository,
    private readonly createOrderRepository: CreateOrderRepository,
    private readonly createOrderItemsRepository: CreateOrderItemRepository
  ) {}

  async execute(payload: CreateOrderWithItems): Promise<Order> {
    const identifierOrder: string = OrderIdentifierGenerator()
    let customerName: string = CustumerNameFiller
    let customerId = null

    if (IsCpfIdentify(payload.customer)) {
      const findUser: User | null = await this.findUserByIdRepository.findById({
        social_security_number: payload.customer
      })
      customerId = findUser?.id
      customerName = findUser?.name ?? CustumerNameFiller
    }

    const findproducts: Product[] | null =
      await this.findProductByConditionRepository.findByCondition({
        ids: payload.items.map((item) => item.product_id)
      })

    if (!findproducts) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        NotFoundAllError(Field.Product)
      )
    }

    const createOrder: Order = await this.createOrderRepository.create({
      order: identifierOrder,
      status: OrderStatus.AwaitingPayment,
      customer: customerName,
      user_id: customerId,
      observation: payload.observation ?? ObservationFiller
    })

    const createOrderItems: OrderItem | OrderItem[] =
      await this.createOrderItemsRepository.create(
        CreateOrderWithItemsMap.execute(
          createOrder,
          OrderItemsWithProductsMap.execute(findproducts, {
            ...payload,
            order_id: createOrder.id
          })
        )
      )

    return OrderWithItemsMap.execute(createOrder, createOrderItems)
  }
}
