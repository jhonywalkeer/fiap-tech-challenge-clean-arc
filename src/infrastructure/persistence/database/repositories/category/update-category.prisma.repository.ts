import { UpdateCategoryDTO } from '@application/dtos/category'
import { UpdateCategoryRepository } from '@application/repositories/category'
import { HttpException } from '@common/utils/exceptions'
import { Category } from '@domain/entities'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindCategoryByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/category'

export class UpdateCategoryPrismaRepository
  implements UpdateCategoryRepository
{
  constructor(
    private readonly prisma: DatabaseConnection,
    private readonly findCategoryById: FindCategoryByIdPrismaRepository
  ) {}

  async update(pathParameters: UpdateCategoryDTO): Promise<Category | null> {
    const category = await this.findCategoryById.findById({
      id: pathParameters.id
    })

    if (!category) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        ErrorMessage.CategoryNotFound
      )
    }

    const update = await this.prisma.category.update({
      where: {
        id: pathParameters.id
      },
      data: {
        name: pathParameters.name ? pathParameters.name : category.name,
        description: pathParameters.description
          ? pathParameters.description
          : category.description
      }
    })

    const find = await this.findCategoryById.findById({
      id: update.id
    })

    return find
  }
}
