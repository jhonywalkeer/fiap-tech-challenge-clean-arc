import { CreateProductDTO } from '@application/dtos/product'
import { Product } from '@domain/entities'
import { StatusCode } from '@domain/enums'
import { CreateProductUseCase } from '@domain/usecases/product'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class CreateProductController implements Controller<Product> {
  constructor(
    private readonly createProductUC: CreateProductUseCase,
    private readonly createProductPresenter: ResponseHandler<Product>
  ) {}
  async handle(body: HttpRequest) {
    const { name, description, category_id, price } = body.body
    const payload: CreateProductDTO = Object.assign(
      new CreateProductDTO(name, description, category_id, price)
    )
    const product: Product = await this.createProductUC.execute(payload)
    return this.createProductPresenter.response(product, StatusCode.Created)
  }
}
