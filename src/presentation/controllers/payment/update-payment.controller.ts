import { UpdatePaymentDTO } from '@application/dtos/payment'
import { HttpException } from '@common/utils/exceptions'
import { Payment } from '@domain/entities'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { UpdatePaymentUseCase } from '@domain/usecases/payment'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class UpdatePaymentController implements Controller<Payment> {
  constructor(
    private readonly updatePaymentUC: UpdatePaymentUseCase,
    private readonly updatePaymentPresenter: ResponseHandler<Payment>
  ) {}
  async handle(pathParameters: HttpRequest) {
    const { id } = pathParameters.params
    const { payment_method, amount, status } = pathParameters.body
    const parameters: UpdatePaymentDTO = Object.assign(
      new UpdatePaymentDTO(id, payment_method, amount, status)
    )
    const payment: Payment | null =
      await this.updatePaymentUC.execute(parameters)

    if (!payment) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        ErrorMessage.PaymentNotFound
      )
    }

    return this.updatePaymentPresenter.response(payment, StatusCode.Sucess)
  }
}
