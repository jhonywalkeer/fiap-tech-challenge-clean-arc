import { FindAllCategoriesDTO } from '@application/dtos/category'
import { FindAllCategoriesRepository } from '@application/repositories/category'
import { Category } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { PaginationFilter } from '@common/utils/filters'

export class FindAllCategoriesPrismaRepository
  implements FindAllCategoriesRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async findAll(
    queryParameters: FindAllCategoriesDTO
  ): Promise<Category[] | null> {
    const { page, limit } = queryParameters

    return this.prisma.category.findMany({
      ...PaginationFilter(page, limit)
    })
  }
}
