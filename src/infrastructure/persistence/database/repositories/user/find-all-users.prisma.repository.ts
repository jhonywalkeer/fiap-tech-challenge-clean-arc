import { FindAllUsersRepository } from '@application/repositories/user'
import { ErrorName, StatusCode } from '@common/enums'
import { FindNotOccurredError } from '@common/errors'
import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { HttpException } from '@common/utils/exceptions'
import { PaginationFilter } from '@common/utils/filters'
import { User } from '@domain/entities'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindAllUsersPrismaRepository implements FindAllUsersRepository {
  constructor(private readonly prisma: DatabaseConnection) {}

  async findAll(
    payload: PaginationAndFilter
  ): Promise<PaginateResponse<User> | null> {
    try {
      const findUsers = await this.prisma.user.findMany({
        ...PaginationFilter(payload.page, payload.limit)
      })
      const countUsers = await this.prisma.user.count()
      return !findUsers || findUsers.length === 0
        ? null
        : {
            total: countUsers,
            page: payload.page,
            total_pages: Math.ceil(countUsers / payload.limit),
            limit: payload.limit,
            data: findUsers
          }
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        FindNotOccurredError(Field.User)
      )
    }
  }
}
