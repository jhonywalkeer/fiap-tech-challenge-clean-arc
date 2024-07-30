import { FindProductByIdDTO } from '@application/dtos/product'
import { HttpException } from '@common/utils/exceptions'
import { Product } from '@domain/entities'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { FindProductByIdUseCase } from '@domain/usecases/product'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class FindProductByIdController implements Controller<Product> {
  constructor(
    private readonly findProductByIdUC: FindProductByIdUseCase,
    private readonly findProductByIdPresenter: ResponseHandler<Product>
  ) {}
  async handle(pathParameters: HttpRequest) {
    const { id } = pathParameters.params
    const parameters: FindProductByIdDTO = Object.assign(
      new FindProductByIdDTO(id)
    )
    const product: Product | null =
      await this.findProductByIdUC.execute(parameters)

    if (!product) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        ErrorMessage.ProductNotFound
      )
    }

    return this.findProductByIdPresenter.response(product, StatusCode.Sucess)
  }
}
