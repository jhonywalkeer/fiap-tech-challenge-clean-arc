import { FindAllUsersDTO } from '@application/dtos/user'
import { FindAllUsersRepository } from '@application/repositories/user'
import { HttpException } from '@common/utils/exceptions'
import { PaginationFilter } from '@common/utils/filters'
import { User } from '@domain/entities'
import { ErrorName, StatusCode } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindAllUsersPrismaRepository implements FindAllUsersRepository {
  constructor(private readonly prisma: DatabaseConnection) {}

  async findAll(queryParameters: FindAllUsersDTO): Promise<User[] | null> {
    const { page, limit } = queryParameters

    try {
      return await this.prisma.user.findMany({
        ...PaginationFilter(page, limit)
      })
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        'Ao tentar buscar os usuários, não foi possivel realizar a operação'
      )
    }
  }
}
