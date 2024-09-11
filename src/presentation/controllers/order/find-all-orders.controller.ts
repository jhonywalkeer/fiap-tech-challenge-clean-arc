import { Order } from '@domain/entities'
import { StatusCode } from '@domain/enums'
import { FindAllOrdersUseCase } from '@domain/usecases/order'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class FindAllOrdersController implements Controller<Order[]> {
  constructor(
    private readonly findAllOrdersUC: FindAllOrdersUseCase,
    private readonly findAllOrdersPresenter: ResponseHandler<Order[]>
  ) {}
  async handle(queryParameters: HttpRequest) {
    const orders: Order[] = await this.findAllOrdersUC.execute(
      queryParameters.query
    )
    return this.findAllOrdersPresenter.response(orders, StatusCode.Sucess)
  }
}
