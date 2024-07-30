import { UpdateOrderDTO } from '@application/dtos/order'
import { HttpException } from '@common/utils/exceptions'
import { Order } from '@domain/entities'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { UpdateOrderUseCase } from '@domain/usecases/order'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class UpdateOrderController implements Controller<Order> {
  constructor(
    private readonly updateOrderUC: UpdateOrderUseCase,
    private readonly updateOrderPresenter: ResponseHandler<Order>
  ) {}
  async handle(pathParameters: HttpRequest) {
    const { id } = pathParameters.params
    const { items, observation, customer, payment } = pathParameters.body
    const parameters: UpdateOrderDTO = Object.assign(
      new UpdateOrderDTO(id, items, payment, observation, customer)
    )
    const order: Order | null = await this.updateOrderUC.execute(parameters)

    if (!order) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        ErrorMessage.OrderNotFound
      )
    }

    return this.updateOrderPresenter.response(order, StatusCode.Sucess)
  }
}
