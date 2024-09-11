import { UpdateCategoryDTO } from '@application/dtos/category'
import { UpdateCategoryRepository } from '@application/repositories/category'
import { UpdateNotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Category } from '@domain/entities'
import { ErrorName, Field, StatusCode } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindCategoryByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/category'

export class UpdateCategoryPrismaRepository
  implements UpdateCategoryRepository
{
  constructor(
    private readonly prisma: DatabaseConnection,
    private readonly categoryRepository: FindCategoryByIdPrismaRepository
  ) {}

  async update(pathParameters: UpdateCategoryDTO): Promise<Category | null> {
    try {
      const update = await this.prisma.category.update({
        where: {
          id: pathParameters.id
        },
        data: {
          name: pathParameters.name,
          description: pathParameters.description
        }
      })

      return await this.categoryRepository.findById({
        id: update.id
      })
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        UpdateNotOccurredError(Field.Category)
      )
    }
  }
}
