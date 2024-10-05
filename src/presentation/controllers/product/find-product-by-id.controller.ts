import { FindProductByIdDTO } from '@application/dtos/product'
import { StatusCode } from '@common/enums'
import { Product } from '@domain/entities'
import { FindProductByIdUseCase } from '@domain/usecases/product'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class FindProductByIdController implements Controller<Product> {
  constructor(
    private readonly findProductByIdUC: FindProductByIdUseCase,
    private readonly findProductByIdPresenter: ResponseHandler<Product>
  ) {}
  async handle(request: HttpRequest) {
    const { id } = request.params
    const parameters: FindProductByIdDTO = Object.assign(
      new FindProductByIdDTO(id)
    )
    const product: Product = await this.findProductByIdUC.execute(parameters)
    return this.findProductByIdPresenter.response(product, StatusCode.Sucess)
  }
}
