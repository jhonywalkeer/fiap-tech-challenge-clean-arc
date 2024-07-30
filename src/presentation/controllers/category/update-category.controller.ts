import { UpdateCategoryDTO } from '@application/dtos/category'
import { HttpException } from '@common/utils/exceptions'
import { Category } from '@domain/entities'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { UpdateCategoryUseCase } from '@domain/usecases/category'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class UpdateCategoryController implements Controller<Category> {
  constructor(
    private readonly updateCategoryUC: UpdateCategoryUseCase,
    private readonly updateCategoryPresenter: ResponseHandler<Category>
  ) {}
  async handle(pathParameters: HttpRequest) {
    const { id } = pathParameters.params
    const { name, description } = pathParameters.body
    const parameters: UpdateCategoryDTO = Object.assign(
      new UpdateCategoryDTO(id, name, description)
    )
    const category: Category | null =
      await this.updateCategoryUC.execute(parameters)

    if (!category) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        ErrorMessage.CategoryNotFound
      )
    }

    return this.updateCategoryPresenter.response(category, StatusCode.Sucess)
  }
}
