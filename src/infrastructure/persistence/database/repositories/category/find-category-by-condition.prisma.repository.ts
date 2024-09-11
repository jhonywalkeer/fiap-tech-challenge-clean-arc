import { FindCategoryByConditionDTO } from '@application/dtos/category'
import { FindCategoryByConditionRepository } from '@application/repositories/category'
import { Category } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { HttpException } from '@common/utils/exceptions'
import { StatusCode, ErrorName, Field } from '@domain/enums'
import { NotFoundByIdError } from '@common/errors'

export class FindCategoryByConditionPrismaRepository
  implements FindCategoryByConditionRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}
  async findByCondition(
    condition: FindCategoryByConditionDTO
  ): Promise<Category[] | null> {
    try {
      return await this.prisma.category.findMany({
        where: {
          name: condition.name
        }
      })
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        NotFoundByIdError(Field.Category)
      )
    }
  }
}
