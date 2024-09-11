import { FindUserByIdDTO } from '@application/dtos/user'
import { User } from '@domain/entities'
import { StatusCode } from '@domain/enums'
import { FindUserByIdUseCase } from '@domain/usecases/user'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class FindByIdController implements Controller<User> {
  constructor(
    private readonly findUserByIdUC: FindUserByIdUseCase,
    private readonly findUserByIdPresenter: ResponseHandler<User>
  ) {}
  async handle(pathParameters: HttpRequest) {
    const { cpf } = pathParameters.params
    const parameters: FindUserByIdDTO = Object.assign(new FindUserByIdDTO(cpf))
    const user: User = await this.findUserByIdUC.execute(parameters)

    return this.findUserByIdPresenter.response(user, StatusCode.Sucess)
  }
}
