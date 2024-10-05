import { UpdateProductDTO } from '@application/dtos/product'
import { StatusCode } from '@common/enums'
import { Product } from '@domain/entities'
import { UpdateProductUseCase } from '@domain/usecases/product'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class UpdateProductController implements Controller<Product> {
  constructor(
    private readonly updateProductUC: UpdateProductUseCase,
    private readonly updateProductPresenter: ResponseHandler<Product>
  ) {}
  async handle(request: HttpRequest) {
    const { id } = request.params
    const { name, description, price, category_id, size } = request.body
    const parameters: UpdateProductDTO = Object.assign(
      new UpdateProductDTO(id, { name, description, price, category_id, size })
    )
    const product: Product = await this.updateProductUC.execute(parameters)

    return this.updateProductPresenter.response(product, StatusCode.Sucess)
  }
}
