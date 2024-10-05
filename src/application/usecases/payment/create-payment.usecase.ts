import { CreatePaymentDTO } from '@application/dtos/payment/create-payment.dto'
import { FindOrderByConditionRepository } from '@application/repositories/order/'
import {
  CreatePaymentRepository,
  FindPaymentByConditionRepository
} from '@application/repositories/payment'
import { ErrorName, StatusCode } from '@common/enums'
import { ExistsError, NotFoundByIdError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Payment } from '@domain/entities'
import { Field, PaymentMethod } from '@domain/enums'
import { CreatePaymentUseCase } from '@domain/usecases/payment/create-payment.usecase'
import { PaymentExternal } from '@infrastructure/gateway/payment/payment-external.gateway'

export class CreatePaymentUC implements CreatePaymentUseCase {
  constructor(
    private readonly findOrderByConditionRepository: FindOrderByConditionRepository,
    private readonly findPaymentByConditionRepository: FindPaymentByConditionRepository,
    private readonly paymentExternalGateway: PaymentExternal,
    private readonly createPaymentRepository: CreatePaymentRepository
  ) {}

  async execute(body: CreatePaymentDTO): Promise<Payment> {
    const findOrder = await this.findOrderByConditionRepository.findByCondition(
      body.order_id
    )

    if (!findOrder) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        NotFoundByIdError(Field.Order)
      )
    }

    const findPayment =
      await this.findPaymentByConditionRepository.findByCondition(body.order_id)

    if (findPayment) {
      throw new HttpException(
        StatusCode.Conflict,
        ErrorName.ResourceAlreadyExists,
        ExistsError(Field.Payment)
      )
    }

    const paymentExternal = await this.paymentExternalGateway.create(body)

    if (!paymentExternal) {
      throw new Error('Payment not found')
    }

    return await this.createPaymentRepository.create({
      ...body,
      payment_method: PaymentMethod.Pix,
      qr_code: paymentExternal.point_of_interaction.transaction_data.qr_code
    })
  }
}
