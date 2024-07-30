import { DeleteOrderDTO } from '@application/dtos/order'
import { StatusCode } from '@domain/enums'
import { DeleteOrderUseCase } from '@domain/usecases/order'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class DeleteOrderController implements Controller<void> {
  constructor(
    private readonly deleteOrderUC: DeleteOrderUseCase,
    private readonly deleteOrderPresenter: ResponseHandler<void>
  ) {}
  async handle(pathParameters: HttpRequest) {
    const { id } = pathParameters.params
    const payload: DeleteOrderDTO = Object.assign(new DeleteOrderDTO(id))

    const product = await this.deleteOrderUC.execute(payload)
    Promise.resolve(product)

    return this.deleteOrderPresenter.response(product, StatusCode.Accepted)
  }
}
