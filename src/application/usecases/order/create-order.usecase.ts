import { CreateOrderItemDTO } from '@application/dtos/order-item'
import { CreateOrderWithItemsDTO } from '@application/dtos/order/create-order-with-items.dto'
import { CreateOrderWithItemsMap, OrderItemsMap } from '@application/mappers'
import { CreateOrderMap } from '@application/mappers/create-order.map'
import { CreateOrderRepository } from '@application/repositories/order'
import { CreateOrderItemRepository } from '@application/repositories/order-item'
import { FindProductByConditionRepository } from '@application/repositories/product'
import { FindUserByIdRepository } from '@application/repositories/user'
import { CustumerNameFiller, ObservationFiller } from '@common/constants'
import { NotFoundSpecificError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { OrderIdentifierGenerator } from '@common/utils/generators'
import { IsCpfIdentify } from '@common/utils/identifiers'
import { Order, OrderItem, Product } from '@domain/entities'
import { StatusCode, ErrorName, OrderStatus, Field } from '@domain/enums'
import { CreateOrderUseCase } from '@domain/usecases/order'
export class CreateOrderUC implements CreateOrderUseCase {
  constructor(
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly findProductByConditionRepository: FindProductByConditionRepository,
    private readonly createOrderRepository: CreateOrderRepository,
    private readonly createOrderItemsRepository: CreateOrderItemRepository
  ) {}

  async execute(body: CreateOrderWithItemsDTO): Promise<Order> {
    const identifierOrder: string = OrderIdentifierGenerator()

    let customerName: string = CustumerNameFiller
    let customerId = null

    if (IsCpfIdentify(body.customer)) {
      const findUser = await this.findUserByIdRepository.findById({
        social_security_number: body.customer
      })

      if (!findUser) {
        throw new HttpException(
          StatusCode.NotFound,
          ErrorName.NotFoundInformation,
          NotFoundSpecificError(Field.User, body.customer)
        )
      }
      customerId = findUser.id ?? null
      customerName = findUser.name
    }

    const findproducts: Product[] | null =
      await this.findProductByConditionRepository.findByCondition({
        ids: body.items.map((item) => item.product_id)
      })

    const identifyOrderItems: OrderItem[] = OrderItemsMap.execute(
      findproducts,
      body.items
    )

    const order: Order = CreateOrderMap.execute(
      identifierOrder,
      customerName,
      identifyOrderItems,
      body
    )

    const createOrder: Order = await this.createOrderRepository.create({
      order: order.order,
      status: OrderStatus.AwaitingPayment,
      customer: customerName,
      user_id: customerId,
      observation: body.observation ?? ObservationFiller
    })

    const orderItemsBody: CreateOrderItemDTO[] =
      CreateOrderWithItemsMap.execute(createOrder, identifyOrderItems)

    const createOrderItems: OrderItem | OrderItem[] =
      await this.createOrderItemsRepository.create(orderItemsBody)

    return {
      ...createOrder,
      items: Array.isArray(createOrderItems)
        ? createOrderItems
        : [createOrderItems]
    }
  }
}
