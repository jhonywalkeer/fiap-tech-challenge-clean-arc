import { FindAllUsersDTO } from '@application/dtos/user'
import { User } from '@domain/entities'
import { StatusCode } from '@domain/enums'
import { FindAllUsersUseCase } from '@domain/usecases/user'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class FindAllUsersController implements Controller<User[]> {
  constructor(
    private readonly findAllUserUC: FindAllUsersUseCase,
    private readonly findAllUserPresenter: ResponseHandler<User[]>
  ) {}
  async handle(queryParameters: HttpRequest) {
    const { query } = queryParameters
    const users: User[] | null = await this.findAllUserUC.execute(
      Object.assign(new FindAllUsersDTO(query.page, query.limit))
    )

    return this.findAllUserPresenter.response(users, StatusCode.Sucess)
  }
}
