import { FindOrderByIdDTO } from '@application/dtos/order'
import { FindOrderByIdRepository } from '@application/repositories/order'
import { HttpException } from '@common/utils/exceptions'
import { Order } from '@domain/entities'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { PaymentCommunication } from '@infrastructure/gateway/payment'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindOrderByIdPrismaRepository implements FindOrderByIdRepository {
  constructor(private readonly prisma: DatabaseConnection) {}

  async findById(pathParameters: FindOrderByIdDTO): Promise<Order | null> {
    const findOrder = await this.prisma.order.findUnique({
      where: {
        id: pathParameters.id
      }
    })

    if (!findOrder || findOrder === null) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        ErrorMessage.OrderNotFound
      )
    }

    const findPayment = await this.prisma.payment.findFirst({
      where: {
        order_id: findOrder?.order
      }
    })

    const findItems = await this.prisma.order_item.findMany({
      where: {
        order_id: findOrder?.id
      }
    })

    const findProducts = await this.prisma.product.findMany({
      where: {
        id: {
          in: findItems.map((item) => item.product_id)
        }
      }
    })

    const findedOrder = {
      id: findOrder?.id,
      order: findOrder?.order,
      status: findOrder?.status,
      items: findItems.map((item) => {
        const product = findProducts.find(
          (product) => product.id === item.product_id
        )
        return {
          product_id: item.product_id,
          name: product?.name,
          price: product?.price,
          quantity: item.quantity,
          amount: item.amount
        }
      }),
      customer: findOrder?.customer,
      payment: {
        id: findPayment?.id,
        order_id: findPayment?.order_id,
        user_id: findPayment?.user_id,
        payment_method: findPayment?.payment_method,
        amount: findPayment?.amount,
        payment_date: findPayment?.payment_date,
        status: findPayment?.status,
        qr_code: await PaymentCommunication()
      },
      observation: findOrder?.observation
    }

    return findedOrder
  }
}
