import { CreateUserDTO } from '@application/dtos/user'
import { CreateUserRepository } from '@application/repositories/user'
import { HttpException } from '@common/utils/exceptions'
import { User } from '@domain/entities'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class CreateUserPrismaRepository implements CreateUserRepository {
  constructor(private readonly prisma: DatabaseConnection) {}

  async create(body: CreateUserDTO): Promise<User> {
    const verifyIfUserExists = await this.prisma.user.findUnique({
      where: {
        social_security_number: body.social_security_number
      }
    })

    if (verifyIfUserExists) {
      throw new HttpException(
        StatusCode.Conflict,
        ErrorName.ResourceAlreadyExists,
        ErrorMessage.UserExists
      )
    }

    return this.prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        social_security_number: body.social_security_number
      }
    })
  }
}
