import { FindUserByIdDTO } from '@application/dtos/user'
import { FindUserByIdRepository } from '@application/repositories/user'
import { HttpException } from '@common/utils/exceptions'
import { User } from '@domain/entities'
import { ErrorMessage, ErrorName, StatusCode } from '@domain/enums'
import { FindUserByIdUseCase } from '@domain/usecases/user'

export class FindUserByIdUC implements FindUserByIdUseCase {
  constructor(
    private readonly findUserByIdRepository: FindUserByIdRepository
  ) {}
  async execute(pathParameters: FindUserByIdDTO): Promise<User> {
    const findUser = await this.findUserByIdRepository.findById(pathParameters)

    if (!findUser) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        ErrorMessage.UserNotFound
      )
    }

    return findUser
  }
}
