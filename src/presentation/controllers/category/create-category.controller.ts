import { CreateCategoryDTO } from '@application/dtos/category'
import { StatusCode } from '@common/enums'
import { Category } from '@domain/entities'
import { CreateCategoryUseCase } from '@domain/usecases/category'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class CreateCategoryController implements Controller<Category> {
  constructor(
    private readonly createCategoryUC: CreateCategoryUseCase,
    private readonly createCategoryPresenter: ResponseHandler<Category>
  ) {}
  async handle(request: HttpRequest) {
    const { name, description } = request.body
    const payload: CreateCategoryDTO = Object.assign(
      new CreateCategoryDTO(name, description)
    )
    const category: Category = await this.createCategoryUC.execute(payload)
    return this.createCategoryPresenter.response(category, StatusCode.Created)
  }
}
