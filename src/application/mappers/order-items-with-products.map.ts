import { ErrorName, StatusCode } from '@common/enums'
import { NotFoundSpecificError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { OrderItem, Product } from '@domain/entities'
import { Field } from '@domain/enums'
import { CreateOrderWithItems } from '@domain/interfaces/order'

export class OrderItemsWithProductsMap {
  static execute(
    products: Product[] | null,
    body: CreateOrderWithItems
  ): OrderItem[] {
    const productMap = new Map(
      products?.map((product) => [product.id, product])
    )
    return body.items.map((item) => {
      const product = productMap.get(item.product_id)
      if (!product) {
        throw new HttpException(
          StatusCode.NotFound,
          ErrorName.NotFoundInformation,
          NotFoundSpecificError(Field.Product, item.product_id)
        )
      }
      return {
        order_id: body.order_id as string,
        product_id: item.product_id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        amount: product.price ? product.price * item.quantity : 0,
        size: product.size
      }
    })
  }
}
