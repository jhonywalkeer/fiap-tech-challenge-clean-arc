import { UpdatePaymentDTO } from '@application/dtos/payment'
import { StatusCode } from '@common/enums'
import { Payment } from '@domain/entities'
import { UpdatePaymentUseCase } from '@domain/usecases/payment'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class UpdatePaymentController implements Controller<Payment> {
  constructor(
    private readonly updatePaymentUC: UpdatePaymentUseCase,
    private readonly updatePaymentPresenter: ResponseHandler<Payment>
  ) {}
  async handle(request: HttpRequest) {
    const { id } = request.params
    const { order_id, payment_method, amount, status } = request.body
    const parameters: UpdatePaymentDTO = Object.assign(
      new UpdatePaymentDTO(id, order_id, payment_method, amount, status)
    )
    const payment: Payment = await this.updatePaymentUC.execute(parameters)

    return this.updatePaymentPresenter.response(payment, StatusCode.Sucess)
  }
}
