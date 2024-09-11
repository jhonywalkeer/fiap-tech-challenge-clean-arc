import { FindAllUsersDTO } from '@application/dtos/user'
import { FindAllUsersRepository } from '@application/repositories/user'
import { HttpException } from '@common/utils/exceptions'
import { User } from '@domain/entities'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { FindAllUsersUseCase } from '@domain/usecases/user'

export class FindAllUsersUC implements FindAllUsersUseCase {
  constructor(
    private readonly findAllUsersRepository: FindAllUsersRepository
  ) {}
  async execute(queryParameters: FindAllUsersDTO): Promise<User[]> {
    const findUsers = await this.findAllUsersRepository.findAll(queryParameters)

    if (!findUsers || findUsers.length === 0) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        ErrorMessage.UsersNotFound
      )
    }

    return findUsers
  }
}
