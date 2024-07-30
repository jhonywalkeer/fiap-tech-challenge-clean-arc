import { FindAllProductsDTO } from '@application/dtos/product'
import { HttpException } from '@common/utils/exceptions'
import { Product } from '@domain/entities'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { FindAllProductsUseCase } from '@domain/usecases/product'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class FindAllProductsController implements Controller<Product[]> {
  constructor(
    private readonly findAllProductUC: FindAllProductsUseCase,
    private readonly findAllProductPresenter: ResponseHandler<Product[]>
  ) {}
  async handle(queryParameters: HttpRequest) {
    const { query } = queryParameters
    const products: Product[] | null = await this.findAllProductUC.execute(
      Object.assign(new FindAllProductsDTO(query.page, query.limit))
    )

    if (!products) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        ErrorMessage.ProductsNotFound
      )
    }
    return this.findAllProductPresenter.response(products, StatusCode.Sucess)
  }
}
