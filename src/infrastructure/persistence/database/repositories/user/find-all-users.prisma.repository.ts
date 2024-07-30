import { FindAllUsersDTO } from '@application/dtos/user'
import { FindAllUsersRepository } from '@application/repositories/user'
import { PaginationFilter } from '@common/utils/filters'
import { User } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindAllUsersPrismaRepository implements FindAllUsersRepository {
  constructor(private readonly prisma: DatabaseConnection) {}

  async findAll(queryParameters: FindAllUsersDTO): Promise<User[] | null> {
    const { page, limit } = queryParameters

    return await this.prisma.user.findMany({
      ...PaginationFilter(page, limit)
    })
  }
}
