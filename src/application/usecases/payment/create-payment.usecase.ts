import { CreatePaymentDTO } from '@application/dtos/payment/create-payment.dto'
import { Payment } from '@domain/entities'
import { CreatePaymentUseCase } from '@domain/usecases/payment/create-payment.usecase'
import { PaymentExternal } from '@infrastructure/gateway/payment/payment-external.gateway'

export class CreatePaymentUC implements CreatePaymentUseCase {
  constructor(
    private readonly paymentExternalGateway: PaymentExternal,
    private readonly createPaymentRepository: any
  ) {}

  async execute(body: CreatePaymentDTO): Promise<Payment> | never {
    return await this.createPaymentRepository.create(body)
  }
}
