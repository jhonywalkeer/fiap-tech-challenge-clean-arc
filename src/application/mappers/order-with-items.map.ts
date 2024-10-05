import { Order, OrderItem } from '@domain/entities'
import { OrderWithItems } from '@domain/interfaces/order/order-with-items.interface'

export class OrderWithItemsMap {
  static execute(order: Order, items: OrderItem[] | OrderItem): OrderWithItems {
    const itemsArray = Array.isArray(items) ? items : [items]
    return {
      ...order,
      payment_id: null,
      customer: {
        id: order.user_id,
        name: order.customer
      },
      items: [
        ...itemsArray.map((item) => ({
          product: {
            id: item.product_id,
            name: item.name,
            price: item.price,
            amount: item.amount
          }
        }))
      ]
    }
  }
}
