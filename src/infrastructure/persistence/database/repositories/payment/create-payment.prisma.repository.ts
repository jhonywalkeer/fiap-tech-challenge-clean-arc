import { CreatePaymentDTO } from '@application/dtos/payment'
import { CreatePaymentRepository } from '@application/repositories/payment'
import { ErrorName, StatusCode } from '@common/enums'
import { CreateNotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Payment } from '@domain/entities'
import { Field, OrderStatus } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class CreatePaymentPrismaRepository implements CreatePaymentRepository {
  constructor(private readonly prisma: DatabaseConnection) {}

  async create(body: CreatePaymentDTO): Promise<Payment> {
    try {
      const createPayment = await this.prisma.payment.create({
        data: {
          user_id: body.payer.id,
          payment_method: body.payment_method,
          amount: body.transaction_amount,
          order_id: body.order_id,
          qr_code: body.qr_code,
          status: OrderStatus.AwaitingPayment
        }
      })
      return createPayment
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        CreateNotOccurredError(Field.Payment)
      )
    }
  }
}
