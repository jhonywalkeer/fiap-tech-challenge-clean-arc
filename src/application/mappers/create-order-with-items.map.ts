import { Order, OrderItem } from '@domain/entities'
import { CreateOrderItem } from '@domain/interfaces/order-item'

export class CreateOrderWithItemsMap {
  static execute(order: Order, orderItems: OrderItem[]): CreateOrderItem[] {
    return orderItems.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      name: item.name,
      price: item.price,
      amount: item.amount
    }))
  }
}
