import { FindAllCategoriesDTO } from '@application/dtos/category'
import { StatusCode } from '@common/enums'
import { PaginateResponse } from '@common/types'
import { Category } from '@domain/entities'
import { FindAllCategoriesUseCase } from '@domain/usecases/category'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class FindAllCategoriesController
  implements Controller<PaginateResponse<Category>>
{
  constructor(
    private readonly findAllUserUC: FindAllCategoriesUseCase,
    private readonly findAllUserPresenter: ResponseHandler<
      PaginateResponse<Category>
    >
  ) {}
  async handle(request: HttpRequest) {
    const { query } = request
    const categories: PaginateResponse<Category> =
      await this.findAllUserUC.execute(
        Object.assign(new FindAllCategoriesDTO(query.page, query.limit))
      )

    return this.findAllUserPresenter.response(categories, StatusCode.Sucess)
  }
}
