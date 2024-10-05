import { FindUserByIdRepository } from '@application/repositories/user'
import { ErrorName, StatusCode } from '@common/enums'
import { FindNotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { User } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindUserBySocialSecurityNumber } from '@domain/interfaces/user'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindUserByIdPrismaRepository implements FindUserByIdRepository {
  constructor(private readonly prisma: DatabaseConnection) {}

  async findById(
    payload: FindUserBySocialSecurityNumber
  ): Promise<User | null> {
    try {
      const findUser = await this.prisma.user.findUnique({
        where: {
          social_security_number: payload.social_security_number
        }
      })
      return !findUser ? null : findUser
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        FindNotOccurredError(Field.User)
      )
    }
  }
}
