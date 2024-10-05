import { FindCategoryByIdRepository } from '@application/repositories/category'
import { ErrorName, StatusCode } from '@common/enums'
import { FindNotOccurredError } from '@common/errors'
import { Identifier } from '@common/interfaces'
import { HttpException } from '@common/utils/exceptions'
import { Category } from '@domain/entities'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindCategoryByIdPrismaRepository
  implements FindCategoryByIdRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async findById(pathParameters: Identifier): Promise<Category | null> {
    try {
      const findCategory = await this.prisma.category.findUnique({
        where: {
          id: pathParameters.id
        }
      })
      return !findCategory ? null : findCategory
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        FindNotOccurredError(Field.Category)
      )
    }
  }
}
