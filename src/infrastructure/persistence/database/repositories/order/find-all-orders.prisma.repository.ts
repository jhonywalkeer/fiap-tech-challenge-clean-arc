import { FindAllOrdersDTO } from '@application/dtos/order'
import { FindAllOrdersRepository } from '@application/repositories/order'
import { HttpException } from '@common/utils/exceptions'
import { Order } from '@domain/entities'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { PaymentCommunication } from '@infrastructure/gateway/payment'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindAllOrdersPrismaRepository implements FindAllOrdersRepository {
  constructor(private readonly prisma: DatabaseConnection) {}

  async findAll(queryParameters: FindAllOrdersDTO): Promise<Order[] | null> {
    const page = queryParameters.page
    const limit = queryParameters.limit

    console.log(page, limit)

    const findOrders = await this.prisma.order.findMany({})
    const QrCode = await PaymentCommunication()

    if (!findOrders || findOrders === null) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        ErrorMessage.OrdersNotFound
      )
    }

    const findPayments = await this.prisma.payment.findMany({
      where: {
        order_id: {
          in: findOrders.map((order) => order.order)
        }
      }
    })

    const findItems = await this.prisma.order_item.findMany({
      where: {
        order_id: {
          in: findOrders.map((order) => order.id)
        }
      }
    })

    const findProducts = await this.prisma.product.findMany({
      where: {
        id: {
          in: findItems.map((item) => item.product_id)
        }
      }
    })

    const findedOrders = findOrders.map((order) => {
      const payment = findPayments.find(
        (payment) => payment.order_id === order.order
      )

      const items = findItems.filter((item) => item.order_id === order.id)

      const products = items.map((item) => {
        const product = findProducts.find(
          (product) => product.id === item.product_id
        )

        return {
          product_id: item.product_id,
          name: product?.name,
          price: product?.price,
          quantity: item.quantity
        }
      })

      return {
        id: order.id,
        order: order.order,
        status: order.status,
        payment: {
          payment_id: payment?.id,
          order_id: payment?.order_id,
          user_id: payment?.user_id,
          payment_method: payment?.payment_method,
          amount: payment?.amount,
          payment_date: payment?.payment_date,
          status: payment?.status,
          qr_code: QrCode
        },
        items: products
      }
    })

    return findedOrders
  }
}
