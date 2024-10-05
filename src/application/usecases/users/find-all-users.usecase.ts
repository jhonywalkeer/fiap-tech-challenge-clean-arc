import { FindAllUsersRepository } from '@application/repositories/user'
import { ErrorName, StatusCode } from '@common/enums'
import { NotFoundAllError } from '@common/errors'
import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { HttpException } from '@common/utils/exceptions'
import { User } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindAllUsersUseCase } from '@domain/usecases/user'

export class FindAllUsersUC implements FindAllUsersUseCase {
  constructor(
    private readonly findAllUsersRepository: FindAllUsersRepository
  ) {}
  async execute(
    queryParameters: PaginationAndFilter
  ): Promise<PaginateResponse<User>> {
    const findUsers: PaginateResponse<User> | null =
      await this.findAllUsersRepository.findAll(queryParameters)

    if (!findUsers) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        NotFoundAllError(Field.User)
      )
    }

    return findUsers
  }
}
