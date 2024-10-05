import { FindCategoryByConditionRepository } from '@application/repositories/category'
import { ErrorName, StatusCode } from '@common/enums'
import { FindNotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Category } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindCategoryByName } from '@domain/interfaces/category'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindCategoryByConditionPrismaRepository
  implements FindCategoryByConditionRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}
  async findByCondition(
    condition: FindCategoryByName
  ): Promise<Category[] | null> {
    try {
      const findCategory = await this.prisma.category.findMany({
        where: {
          name: condition.name
        }
      })
      return !findCategory || findCategory.length === 0 ? null : findCategory
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        FindNotOccurredError(Field.Category)
      )
    }
  }
}
