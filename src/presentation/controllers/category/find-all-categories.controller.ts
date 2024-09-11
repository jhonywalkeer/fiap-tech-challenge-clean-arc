import { FindAllCategoriesDTO } from '@application/dtos/category'
import { Category } from '@domain/entities'
import { StatusCode } from '@domain/enums'
import { FindAllCategoriesUseCase } from '@domain/usecases/category'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class FindAllCategoriesController implements Controller<Category[]> {
  constructor(
    private readonly findAllUserUC: FindAllCategoriesUseCase,
    private readonly findAllUserPresenter: ResponseHandler<Category[]>
  ) {}
  async handle(queryParameters: HttpRequest) {
    const { query } = queryParameters
    const categories: Category[] = await this.findAllUserUC.execute(
      Object.assign(new FindAllCategoriesDTO(query.page, query.limit))
    )

    return this.findAllUserPresenter.response(categories, StatusCode.Sucess)
  }
}
