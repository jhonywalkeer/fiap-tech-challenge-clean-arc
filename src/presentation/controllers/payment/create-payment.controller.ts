import { CreatePaymentDTO } from '@application/dtos/payment'
import { StatusCode } from '@common/enums'
import { Payment } from '@domain/entities'
import { CreatePaymentUseCase } from '@domain/usecases/payment/create-payment.usecase'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class CreatePaymentController implements Controller<Payment> {
  constructor(
    private readonly createPaymentUC: CreatePaymentUseCase,
    private readonly createPaymentPresenter: ResponseHandler<Payment>
  ) {}
  async handle(request: HttpRequest) {
    const { order_id, transaction_amount, description, payment_method, payer } =
      request.body
    const payload: CreatePaymentDTO = Object.assign(
      new CreatePaymentDTO(
        order_id,
        transaction_amount,
        description,
        payment_method,
        payer
      )
    )
    const payment: Payment = await this.createPaymentUC.execute(payload)

    return this.createPaymentPresenter.response(payment, StatusCode.Sucess)
  }
}
