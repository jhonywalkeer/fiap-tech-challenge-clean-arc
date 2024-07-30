import { FindUserByIdDTO } from '@application/dtos/user'
import { FindUserByIdRepository } from '@application/repositories/user'
import { User } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindUserByIdPrismaRepository implements FindUserByIdRepository {
  constructor(private readonly prisma: DatabaseConnection) {}

  async findById(pathParameters: FindUserByIdDTO): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        social_security_number: pathParameters.social_security_number
      }
    })
  }
}
