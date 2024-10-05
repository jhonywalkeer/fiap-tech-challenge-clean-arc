import { DeleteCategoryRepository } from '@application/repositories/category'
import { ErrorName, StatusCode } from '@common/enums'
import { DeleteNotOccurredError } from '@common/errors'
import { Identifier } from '@common/interfaces'
import { HttpException } from '@common/utils/exceptions'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'
export class DeleteCategoryPrismaRepository
  implements DeleteCategoryRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async delete(pathParameters: Identifier): Promise<void> {
    try {
      await this.prisma.category.delete({
        where: {
          id: pathParameters.id
        }
      })
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        DeleteNotOccurredError(Field.Category)
      )
    }
  }
}
