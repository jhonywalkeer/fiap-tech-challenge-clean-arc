import { CreatePaymentDTO } from '@application/dtos/payment'
import { HttpException } from '@common/utils/exceptions'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { CreatePaymentUseCase } from '@domain/usecases/payment/create-payment.usecase'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'
import { Payment } from '@domain/entities'

export class CreatePaymentController implements Controller<Payment> {
  constructor(
    private readonly createPaymentUC: CreatePaymentUseCase,
    private readonly createPaymentPresenter: ResponseHandler<Payment>
  ) {}
  async handle(body: HttpRequest) {
    const { transaction_amount, description, payment_method_id, payer } =
      body.body
    const payload: CreatePaymentDTO = Object.assign(
      new CreatePaymentDTO(
        transaction_amount,
        description,
        payment_method_id,
        payer
      )
    )
    const payment: Payment | null = await this.createPaymentUC.execute(payload)

    if (!payment) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        ErrorMessage.PaymentNotFound
      )
    }

    return this.createPaymentPresenter.response(payment, StatusCode.Sucess)
  }
}
