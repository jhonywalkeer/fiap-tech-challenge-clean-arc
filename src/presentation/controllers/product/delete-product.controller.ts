import { DeleteProductDTO } from '@application/dtos/product'
import { StatusCode } from '@common/enums'
import { DeleteProductUseCase } from '@domain/usecases/product'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class DeleteProductController implements Controller<void> {
  constructor(
    private readonly deleteProductUC: DeleteProductUseCase,
    private readonly deleteProductPresenter: ResponseHandler<void>
  ) {}
  async handle(request: HttpRequest) {
    const { id } = request.params
    const payload: DeleteProductDTO = Object.assign(new DeleteProductDTO(id))
    const product: void = await this.deleteProductUC.execute(payload)
    return this.deleteProductPresenter.response(product, StatusCode.Accepted)
  }
}
