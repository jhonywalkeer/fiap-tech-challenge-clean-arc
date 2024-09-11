import { CreateOrderWithItemsDTO } from '@application/dtos/order/create-order-with-items.dto'
import { ObservationFiller } from '@common/constants'
import { Order, OrderItem } from '@domain/entities'
import { OrderStatus } from '@domain/enums'

export class CreateOrderMap {
  static execute(
    identifierOrder: string,
    customerName: string,
    orderItems: OrderItem[],
    order: CreateOrderWithItemsDTO
  ): Order {
    return {
      items: orderItems,
      order: identifierOrder,
      status: OrderStatus.AwaitingPayment,
      customer: customerName,
      observation: order.observation ?? ObservationFiller
    }
  }
}
