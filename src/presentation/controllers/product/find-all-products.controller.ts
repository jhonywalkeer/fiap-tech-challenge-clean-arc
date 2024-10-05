import { FindAllProductsDTO } from '@application/dtos/product'
import { StatusCode } from '@common/enums'
import { PaginateResponse } from '@common/types'
import { Product } from '@domain/entities'
import { FindAllProductsUseCase } from '@domain/usecases/product'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class FindAllProductsController
  implements Controller<PaginateResponse<Product>>
{
  constructor(
    private readonly findAllProductUC: FindAllProductsUseCase,
    private readonly findAllProductPresenter: ResponseHandler<
      PaginateResponse<Product>
    >
  ) {}
  async handle(request: HttpRequest) {
    const { query } = request
    const products: PaginateResponse<Product> =
      await this.findAllProductUC.execute(
        Object.assign(new FindAllProductsDTO(query.page, query.limit))
      )
    return this.findAllProductPresenter.response(products, StatusCode.Sucess)
  }
}
