import { UpdatePaymentDTO } from '@application/dtos/payment'
import { UpdatePaymentRepository } from '@application/repositories/payment'
import { HttpException } from '@common/utils/exceptions'
import { Payment } from '@domain/entities'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { PaymentCommunication } from '@infrastructure/gateway/payment'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class UpdatePaymentPrismaRepository implements UpdatePaymentRepository {
  constructor(private readonly prisma: DatabaseConnection) {}

  async update(pathParameters: UpdatePaymentDTO): Promise<Payment | null> {
    const QrCode = await PaymentCommunication()
    const findPayment = await this.prisma.payment.findFirst({
      select: {
        id: true
      },
      where: {
        id: pathParameters.id
      }
    })

    if (findPayment === null) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        ErrorMessage.PaymentNotFound
      )
    }

    const update = await this.prisma.payment.update({
      where: {
        id: pathParameters.id
      },
      data: {
        payment_method: pathParameters.payment_method,
        status: pathParameters.status
      }
    })

    return {
      id: update.id,
      user_id: update.user_id,
      payment_method: update.payment_method,
      amount: update.amount,
      status: update.status,
      payment_date: update.payment_date,
      qr_code: QrCode
    }
  }
}
