import { CreateUserDTO } from '@application/dtos/user'
import {
  CreateUserRepository,
  FindUserByIdRepository
} from '@application/repositories/user'
import { ExistsError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { User } from '@domain/entities'
import { ErrorName, Field, StatusCode } from '@domain/enums'
import { CreateUserUseCase } from '@domain/usecases/user'

export class CreateUserUC implements CreateUserUseCase {
  constructor(
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly createUserRepository: CreateUserRepository
  ) {}
  async execute(body: CreateUserDTO): Promise<User> | never {
    const findUser = await this.findUserByIdRepository.findById({
      social_security_number: body.social_security_number
    })

    if (findUser) {
      throw new HttpException(
        StatusCode.Conflict,
        ErrorName.ResourceAlreadyExists,
        ExistsError(Field.User)
      )
    }

    return await this.createUserRepository.create(body)
  }
}
