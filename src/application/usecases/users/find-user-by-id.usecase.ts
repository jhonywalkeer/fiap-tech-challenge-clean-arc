import { FindUserByIdRepository } from '@application/repositories/user'
import { ErrorName, StatusCode } from '@common/enums'
import { NotFoundByIdError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { User } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindUserBySocialSecurityNumber } from '@domain/interfaces/user'
import { FindUserByIdUseCase } from '@domain/usecases/user'

export class FindUserByIdUC implements FindUserByIdUseCase {
  constructor(
    private readonly findUserByIdRepository: FindUserByIdRepository
  ) {}
  async execute(pathParameters: FindUserBySocialSecurityNumber): Promise<User> {
    const findUser: User | null =
      await this.findUserByIdRepository.findById(pathParameters)

    if (!findUser) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        NotFoundByIdError(Field.User)
      )
    }
    return findUser
  }
}
