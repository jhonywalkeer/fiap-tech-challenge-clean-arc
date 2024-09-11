import { CreateOrderItemDTO } from '@application/dtos/order-item'
import { ProductNotFoundExceptionMessage, SizeFiller } from '@common/constants'
import { HttpException } from '@common/utils/exceptions'
import { OrderItem, Product } from '@domain/entities'
import { StatusCode, ErrorName } from '@domain/enums'

export class OrderItemsMap {
  static execute(
    products: Product[] | null,
    body: CreateOrderItemDTO[]
  ): OrderItem[] {
    const productMap = new Map(
      products?.map((product) => [product.id, product])
    )
    return body.map((item) => {
      const product = productMap.get(item.product_id)
      if (!product) {
        throw new HttpException(
          StatusCode.NotFound,
          ErrorName.NotFoundInformation,
          ProductNotFoundExceptionMessage(item.product_id)
        )
      }
      return {
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
