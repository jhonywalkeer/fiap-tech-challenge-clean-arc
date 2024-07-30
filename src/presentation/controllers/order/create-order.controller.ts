import { CreateOrderDTO } from '@application/dtos/order'
import { Order } from '@domain/entities'
import { StatusCode } from '@domain/enums'
import { CreateOrderUseCase } from '@domain/usecases/order'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class CreateOrderController implements Controller<Order> {
  constructor(
    private readonly createOrderUC: CreateOrderUseCase,
    private readonly createOrderPresenter: ResponseHandler<Order>
  ) {}
  async handle(body: HttpRequest) {
    const { items, observation, customer, payment } = body.body
    const payload: CreateOrderDTO = Object.assign(
      new CreateOrderDTO(items, payment, observation, customer)
    )
    const order: Order = await this.createOrderUC.execute(payload)
    return this.createOrderPresenter.response(order, StatusCode.Created)
  }
}
