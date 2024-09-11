import { CreateOrderItemDTO } from '@application/dtos/order-item'
import { Order, OrderItem } from '@domain/entities'

export class CreateOrderWithItemsMap {
  static execute(order: Order, orderItems: OrderItem[]): CreateOrderItemDTO[] {
    return orderItems.map((item) => ({
      order_id: order.id as string,
      product_id: item.product_id,
      quantity: item.quantity,
      name: item.name,
      price: item.price,
      amount: item.amount
    }))
  }
}
