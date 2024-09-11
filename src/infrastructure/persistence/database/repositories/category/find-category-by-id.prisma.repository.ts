import { FindCategoryByIdDTO } from '@application/dtos/category'
import { FindCategoryByIdRepository } from '@application/repositories/category'
import { NotFoundByIdError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Category } from '@domain/entities'
import { StatusCode, ErrorName, Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindCategoryByIdPrismaRepository
  implements FindCategoryByIdRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async findById(
    pathParameters: FindCategoryByIdDTO
  ): Promise<Category | null> {
    try {
      return await this.prisma.category.findUnique({
        where: {
          id: pathParameters.id
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
