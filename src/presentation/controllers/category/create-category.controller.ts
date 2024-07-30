import { CreateCategoryDTO } from '@application/dtos/category'
import { Category } from '@domain/entities'
import { StatusCode } from '@domain/enums'
import { CreateCategoryUseCase } from '@domain/usecases/category'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class CreateCategoryController implements Controller<Category> {
  constructor(
    private readonly createCategoryUC: CreateCategoryUseCase,
    private readonly createCategoryPresenter: ResponseHandler<Category>
  ) {}
  async handle(body: HttpRequest) {
    const { name, description } = body.body
    const payload: CreateCategoryDTO = Object.assign(
      new CreateCategoryDTO(name, description)
    )
    const category: Category = await this.createCategoryUC.execute(payload)
    return this.createCategoryPresenter.response(category, StatusCode.Created)
  }
}
