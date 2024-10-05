import { FindAllUsersDTO } from '@application/dtos/user'
import { StatusCode } from '@common/enums'
import { PaginateResponse } from '@common/types/paginate-response.type'
import { User } from '@domain/entities'
import { FindAllUsersUseCase } from '@domain/usecases/user'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class FindAllUsersController
  implements Controller<PaginateResponse<User> | null>
{
  constructor(
    private readonly findAllUserUC: FindAllUsersUseCase,
    private readonly findAllUserPresenter: ResponseHandler<PaginateResponse<User> | null>
  ) {}
  async handle(request: HttpRequest) {
    const { query } = request
    const users: PaginateResponse<User> = await this.findAllUserUC.execute(
      Object.assign(new FindAllUsersDTO(query.page, query.limit))
    )
    return this.findAllUserPresenter.response(users, StatusCode.Sucess)
  }
}
