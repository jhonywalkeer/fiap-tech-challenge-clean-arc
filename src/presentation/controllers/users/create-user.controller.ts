import { CreateUserDTO } from '@application/dtos/user'
import { StatusCode } from '@common/enums'
import { User } from '@domain/entities'
import { CreateUserUseCase } from '@domain/usecases/user'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class CreateUserController implements Controller<User> {
  constructor(
    private readonly createUserUC: CreateUserUseCase,
    private readonly createUserPresenter: ResponseHandler<User>
  ) {}
  async handle(body: HttpRequest) {
    const payload = Object.assign(
      new CreateUserDTO(
        body.body.name,
        body.body.email,
        body.body.social_security_number
      )
    )
    const user: User = await this.createUserUC.execute(payload)
    return this.createUserPresenter.response(user, StatusCode.Created)
  }
}
