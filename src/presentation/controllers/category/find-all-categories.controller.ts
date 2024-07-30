import { FindAllCategoriesDTO } from '@application/dtos/category'
import { HttpException } from '@common/utils/exceptions'
import { Category } from '@domain/entities'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
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
    const categories: Category[] | null = await this.findAllUserUC.execute(
      Object.assign(new FindAllCategoriesDTO(query.page, query.limit))
    )

    if (!categories) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        ErrorMessage.CategoriesNotFound
      )
    }
    return this.findAllUserPresenter.response(categories, StatusCode.Sucess)
  }
}
