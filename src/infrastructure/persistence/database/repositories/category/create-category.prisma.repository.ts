import { CreateCategoryRepository } from '@application/repositories/category'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { CreateCategoryDTO } from '@application/dtos/category'
import { Category } from '@domain/entities'
import { HttpException } from '@common/utils/exceptions'
import { ErrorName, Field, StatusCode } from '@domain/enums'
import { CreateNotOccurredError } from '@common/errors'

export class CreateCategoryPrismaRepository
  implements CreateCategoryRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async create(body: CreateCategoryDTO): Promise<Category> {
    try {
      return await this.prisma.category.create({
        data: {
          name: body.name,
          description: body.description
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
