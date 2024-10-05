import { CreateUserDTO } from '@application/dtos/user'
import { CreateUserRepository } from '@application/repositories/user'
import { StatusCode, ErrorName } from '@common/enums'
import { HttpException } from '@common/utils/exceptions'
import { User } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class CreateUserPrismaRepository implements CreateUserRepository {
  constructor(private readonly prisma: DatabaseConnection) {}

  async create(body: CreateUserDTO): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          social_security_number: body.social_security_number
        }
      })
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        'Ao tentar criar um usuário, não foi possivel realizar a operação'
      )
    }
  }
}
