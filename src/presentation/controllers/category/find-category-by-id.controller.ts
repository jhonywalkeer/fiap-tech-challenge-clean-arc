import { FindCategoryByIdDTO } from '@application/dtos/category'
import { Category } from '@domain/entities'
import { StatusCode } from '@domain/enums'
import { FindCategoryByIdUseCase } from '@domain/usecases/category'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class FindCategoryByIdController implements Controller<Category> {
  constructor(
    private readonly findCategoryByIdUC: FindCategoryByIdUseCase,
    private readonly findCategoryByIdPresenter: ResponseHandler<Category>
  ) {}
  async handle(pathParameters: HttpRequest) {
    const { id } = pathParameters.params
    const parameters: FindCategoryByIdDTO = Object.assign(
      new FindCategoryByIdDTO(id)
    )
    const category = await this.findCategoryByIdUC.execute(parameters)

    return this.findCategoryByIdPresenter.response(category, StatusCode.Sucess)
  }
}
