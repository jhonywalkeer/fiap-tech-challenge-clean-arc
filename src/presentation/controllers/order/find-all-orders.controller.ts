import { HttpException } from '@common/utils/exceptions'
import { Order } from '@domain/entities'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { FindAllOrdersUseCase } from '@domain/usecases/order'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class FindAllOrdersController implements Controller<Order[]> {
  constructor(
    private readonly findAllOrdersUC: FindAllOrdersUseCase,
    private readonly findAllOrdersPresenter: ResponseHandler<Order[]>
  ) {}
  async handle(queryParameters: HttpRequest) {
    const orders: Order[] | null = await this.findAllOrdersUC.execute(
      queryParameters.query
    )

    if (!orders) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        ErrorMessage.OrdersNotFound
      )
    }
    return this.findAllOrdersPresenter.response(orders, StatusCode.Sucess)
  }
}
