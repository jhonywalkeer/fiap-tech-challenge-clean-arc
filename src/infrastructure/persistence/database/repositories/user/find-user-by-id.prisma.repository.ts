import { FindUserByIdDTO } from '@application/dtos/user'
import { FindUserByIdRepository } from '@application/repositories/user'
import { HttpException } from '@common/utils/exceptions'
import { User } from '@domain/entities'
import { ErrorName, StatusCode } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindUserByIdPrismaRepository implements FindUserByIdRepository {
  constructor(private readonly prisma: DatabaseConnection) {}

  async findById(pathParameters: FindUserByIdDTO): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          social_security_number: pathParameters.social_security_number
        }
      })
    } catch (error) {
      console.log(error)
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        'Ao tentar buscar um usuário, não foi possivel realizar a operação'
      )
    }
  }
}
