import { FindCategoryByIdDTO } from '@application/dtos/category'
import { FindCategoryByIdRepository } from '@application/repositories/category'
import { Category } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindCategoryByIdPrismaRepository
  implements FindCategoryByIdRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async findById(
    pathParameters: FindCategoryByIdDTO
  ): Promise<Category | null> {
    return this.prisma.category.findFirst({
      where: {
        id: pathParameters.id
      }
    })
  }
}
