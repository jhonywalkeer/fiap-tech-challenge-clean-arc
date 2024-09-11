import { FindAllCategoriesDTO } from '@application/dtos/category'
import { FindAllCategoriesRepository } from '@application/repositories/category'
import { Category } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { PaginationFilter } from '@common/utils/filters'
import { HttpException } from '@common/utils/exceptions'
import { StatusCode, ErrorName, Field } from '@domain/enums'
import { NotFoundAllError } from '@common/errors'

export class FindAllCategoriesPrismaRepository
  implements FindAllCategoriesRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async findAll(
    queryParameters: FindAllCategoriesDTO
  ): Promise<Category[] | null> {
    const { page, limit } = queryParameters

    try {
      return this.prisma.category.findMany({
        ...PaginationFilter(page, limit)
      })
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        NotFoundAllError(Field.Category)
      )
    }
  }
}
