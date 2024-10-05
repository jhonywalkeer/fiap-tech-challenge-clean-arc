import { FindUserByConditionRepository } from '@application/repositories/user'
import { StatusCode, ErrorName } from '@common/enums'
import { NotFoundByIdError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { User } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindUserByCondition } from '@domain/interfaces/user'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindUserByConditionPrismaRepository
  implements FindUserByConditionRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async findByCondition(payload: FindUserByCondition): Promise<User[] | null> {
    try {
      const findPayments = await this.prisma.user.findMany({
        where: {
          email: payload.email
        }
      })

      return !findPayments || findPayments.length === 0 ? null : findPayments
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        NotFoundByIdError(Field.Payment)
      )
    }
  }
}
