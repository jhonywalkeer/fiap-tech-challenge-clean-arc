import { DeleteCategoryDTO } from '@application/dtos/category'
import { StatusCode } from '@domain/enums'
import { DeleteCategoryUseCase } from '@domain/usecases/category'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class DeleteCategoryController implements Controller<void> {
  constructor(
    private readonly deleteCategoryUC: DeleteCategoryUseCase,
    private readonly deleteCategoryPresenter: ResponseHandler<void>
  ) {}
  async handle(pathParameters: HttpRequest) {
    const { id } = pathParameters.params
    const payload: DeleteCategoryDTO = Object.assign(new DeleteCategoryDTO(id))

    const category = await this.deleteCategoryUC.execute(payload)
    Promise.resolve(category)

    return this.deleteCategoryPresenter.response(category, StatusCode.Accepted)
  }
}
