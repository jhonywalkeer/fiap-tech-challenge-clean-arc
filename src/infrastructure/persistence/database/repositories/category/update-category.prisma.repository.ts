import { UpdateCategoryRepository } from '@application/repositories/category'
import { ErrorName, StatusCode } from '@common/enums'
import { UpdateNotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Category } from '@domain/entities'
import { Field } from '@domain/enums'
import { UpdateCategory } from '@domain/interfaces/category'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindCategoryByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/category'

export class UpdateCategoryPrismaRepository
  implements UpdateCategoryRepository
{
  constructor(
    private readonly prisma: DatabaseConnection,
    private readonly categoryRepository: FindCategoryByIdPrismaRepository
  ) {}

  async update(payload: UpdateCategory): Promise<Category | null> {
    try {
      const update = await this.prisma.category.update({
        where: {
          id: payload.id
        },
        data: {
          name: payload.name,
          description: payload.description
        }
      })

      return await this.categoryRepository.findById({ id: update.id })
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        UpdateNotOccurredError(Field.Category)
      )
    }
  }
}
