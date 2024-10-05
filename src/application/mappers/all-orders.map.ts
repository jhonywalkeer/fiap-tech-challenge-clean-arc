import { ItemByPropertyIdentify } from '@common/utils/identifiers'
import { Order, OrderItem, Product, Payment } from '@domain/entities'
import {} from 'mercadopago'

export class AllOrdersMap {
  static execute(
    order: Order,
    payments: Payment[] | null,
    items: OrderItem[] | null,
    products: Product[] | null
  ) {
    const payment = ItemByPropertyIdentify(payments, 'order_id', order.order)

    const orderItems = items?.filter(
      (orderItem) => orderItem.order_id === order.id
    )

    const productsDto = orderItems?.map((orderItem) => {
      const product = ItemByPropertyIdentify(
        products,
        'id',
        orderItem.product_id
      )

      return {
        product_id: orderItem.product_id,
        name: product?.name,
        price: product?.price,
        quantity: orderItem.quantity
      }
    })

    return {
      id: order.id,
      order: order.order,
      status: order.status,
      customer: order.customer,
      items: orderItems?.map((orderItem) => {
        const product = productsDto?.find(
          (product) => product.product_id === orderItem.product_id
        )
        return {
          product_id: orderItem.product_id,
          name: product?.name,
          price: product?.price,
          quantity: orderItem.quantity,
          amount: orderItem.amount
        }
      }),
      payment: {
        id: payment?.id ?? null,
        user_id: payment?.user_id ?? null,
        payment_method: payment?.payment_method ?? null,
        amount: payment?.amount ?? 0,
        qr_code: payment?.qr_code ?? null,
        status: payment?.status ?? null
      },
      observation: order.observation
    }
  }
}
