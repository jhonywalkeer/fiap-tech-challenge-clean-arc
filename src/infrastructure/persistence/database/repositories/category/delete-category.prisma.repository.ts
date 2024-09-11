import { DeleteCategoryDTO } from '@application/dtos/category'
import { DeleteCategoryRepository } from '@application/repositories/category'
import { DeleteNotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { StatusCode, ErrorName, Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'
export class DeleteCategoryPrismaRepository
  implements DeleteCategoryRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async delete(pathParameters: DeleteCategoryDTO): Promise<void> {
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
