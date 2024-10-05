import { CreateCategoryRepository } from '@application/repositories/category'
import { ErrorName, StatusCode } from '@common/enums'
import { CreateNotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Category } from '@domain/entities'
import { Field } from '@domain/enums'
import { CreateCategory } from '@domain/interfaces/category'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class CreateCategoryPrismaRepository
  implements CreateCategoryRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async create(payload: CreateCategory): Promise<Category> {
    try {
      return await this.prisma.category.create({
        data: {
          name: payload.name,
          description: payload.description
        }
      })
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        CreateNotOccurredError(Field.Category)
      )
    }
  }
}
