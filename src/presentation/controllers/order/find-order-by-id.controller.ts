import { FindOrderByIdDTO } from '@application/dtos/order'
import { HttpException } from '@common/utils/exceptions'
import { Order } from '@domain/entities'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { FindOrderByIdUseCase } from '@domain/usecases/order'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class FindOrderByIdController implements Controller<Order> {
  constructor(
    private readonly findOrderByIdUC: FindOrderByIdUseCase,
    private readonly findOrderByIdPresenter: ResponseHandler<Order>
  ) {}
  async handle(pathParameters: HttpRequest) {
    const { id } = pathParameters.params
    const parameters: FindOrderByIdDTO = Object.assign(new FindOrderByIdDTO(id))
    const order: Order | null = await this.findOrderByIdUC.execute(parameters)

    if (!order) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        ErrorMessage.OrderNotFound
      )
    }

    return this.findOrderByIdPresenter.response(order, StatusCode.Sucess)
  }
}
