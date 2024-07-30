import { UpdateProductDTO } from '@application/dtos/product'
import { HttpException } from '@common/utils/exceptions'
import { Product } from '@domain/entities'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { UpdateProductUseCase } from '@domain/usecases/product'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class UpdateProductController implements Controller<Product> {
  constructor(
    private readonly updateProductUC: UpdateProductUseCase,
    private readonly updateProductPresenter: ResponseHandler<Product>
  ) {}
  async handle(pathParameters: HttpRequest) {
    const { id } = pathParameters.params
    const { name, description, price, category_id } = pathParameters.body
    const parameters: UpdateProductDTO = Object.assign(
      new UpdateProductDTO(id, name, description, price, category_id)
    )
    const product: Product | null =
      await this.updateProductUC.execute(parameters)

    if (!product) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        ErrorMessage.ProductNotFound
      )
    }

    return this.updateProductPresenter.response(product, StatusCode.Sucess)
  }
}
