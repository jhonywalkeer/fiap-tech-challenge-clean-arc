import { FindAllOrdersDTO } from '@application/dtos/order'
import { FindAllOrdersRepository } from '@application/repositories/order'
import { HttpException } from '@common/utils/exceptions'
import { Order, Payment } from '@domain/entities'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { PaymentCommunication } from '@infrastructure/gateway/payment'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  OrderItemsSchema,
  OrderSchema,
  ProductWithCategorySchema
} from '../../schemas'
import { FindPaymentByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/payment'
import { FindOrderItemByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/order-item'
import { FindProductByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/product'
import { EmptyFiller } from '@common/constants'

export class FindAllOrdersPrismaRepository implements FindAllOrdersRepository {
  constructor(
    private readonly prisma: DatabaseConnection,
    private readonly paymentRepository: FindPaymentByConditionPrismaRepository,
    private readonly orderItemRepository: FindOrderItemByConditionPrismaRepository,
    private readonly productRepository: FindProductByConditionPrismaRepository
  ) {}

  async findAll(queryParameters: FindAllOrdersDTO): Promise<Order[] | null> {
    const page = queryParameters.page
    const limit = queryParameters.limit

    console.log(page, limit)

    const findOrders: OrderSchema[] = await this.prisma.order.findMany({})
    const QrCode = await PaymentCommunication()

    if (!findOrders || findOrders === null) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        ErrorMessage.OrdersNotFound
      )
    }

    const findPayments: Payment[] | null =
      await this.paymentRepository.findByCondition({
        order_id: findOrders.map((order) => order.id)
      })

    const findItems: OrderItemsSchema[] | null =
      await this.orderItemRepository.findByCondition({
        ids: findOrders.map((order) => order.id)
      })

    const findProducts: ProductWithCategorySchema[] | null =
      await this.productRepository.findByCondition({
        ids: findItems?.map((item) => item.product_id ?? EmptyFiller)
      })

    const findedOrders = findOrders.map((order) => {
      const payment = findPayments?.find(
        (payment) => payment.order_id === order.order
      )

      const orderItems = findItems?.filter(
        (orderItem) => orderItem.order_id === order.id
      )

      const products = orderItems?.map((orderItem) => {
        const product = findProducts?.find(
          (product) => product.id === orderItem.product_id
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
          const product = products?.find(
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
          id: payment?.id,
          user_id: payment?.user_id,
          payment_method: payment?.payment_method,
          amount: payment?.amount ?? 0,
          qr_code: QrCode,
          status: payment?.status
        },
        observation: order.observation,
        created_at: order.created_at
      }
    })

    return findedOrders
  }
}
