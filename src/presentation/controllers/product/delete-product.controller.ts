import { DeleteProductDTO } from '@application/dtos/product'
import { StatusCode } from '@domain/enums'
import { DeleteProductUseCase } from '@domain/usecases/product'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class DeleteProductController implements Controller<void> {
  constructor(
    private readonly deleteProductUC: DeleteProductUseCase,
    private readonly deleteProductPresenter: ResponseHandler<void>
  ) {}
  async handle(pathParameters: HttpRequest) {
    const { id } = pathParameters.params
    const payload: DeleteProductDTO = Object.assign(new DeleteProductDTO(id))

    const product = await this.deleteProductUC.execute(payload)
    Promise.resolve(product)

    return this.deleteProductPresenter.response(product, StatusCode.Accepted)
  }
}
