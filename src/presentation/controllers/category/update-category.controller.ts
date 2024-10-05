import { UpdateCategoryDTO } from '@application/dtos/category'
import { StatusCode } from '@common/enums'
import { Category } from '@domain/entities'
import { UpdateCategoryUseCase } from '@domain/usecases/category'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class UpdateCategoryController implements Controller<Category> {
  constructor(
    private readonly updateCategoryUC: UpdateCategoryUseCase,
    private readonly updateCategoryPresenter: ResponseHandler<Category>
  ) {}
  async handle(request: HttpRequest) {
    const { id } = request.params
    const { name, description } = request.body
    const parameters: UpdateCategoryDTO = Object.assign(
      new UpdateCategoryDTO(id, { name, description })
    )
    const category: Category = await this.updateCategoryUC.execute(parameters)

    return this.updateCategoryPresenter.response(category, StatusCode.Sucess)
  }
}
