import { FindUserByIdDTO } from '@application/dtos/user'
import { HttpException } from '@common/utils/exceptions'
import { User } from '@domain/entities'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
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
    const user: User | null = await this.findUserByIdUC.execute(parameters)

    if (!user) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        ErrorMessage.UserNotFound
      )
    }

    return this.findUserByIdPresenter.response(user, StatusCode.Sucess)
  }
}
