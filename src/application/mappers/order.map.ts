import { EmptyFiller } from '@common/constants'
import { Order } from '@domain/entities'
import {
  OrderItemsSchema,
  OrderSchema,
  ProductSchema
} from '@infrastructure/persistence/database/schemas'

export class OrderMap {
  static async execute(
    order: OrderSchema,
    orderItems: OrderItemsSchema[] | null,
    products: ProductSchema[] | null
  ): Promise<Order> {
    return {
      id: order.id,
      order: order.order,
      status: order.status,
      items:
        orderItems?.map((orderItem) => {
          const product = products?.find(
            (product) => product.id === orderItem.product_id
          )
          return {
            product_id: orderItem.product_id ?? EmptyFiller,
            name: product?.name ?? EmptyFiller,
            price: product?.price ?? 0,
            quantity: orderItem.quantity,
            amount: orderItem.amount ?? 0
          }
        }) || [],
      customer: order?.customer,
      observation: order?.observation
    }
  }
}
