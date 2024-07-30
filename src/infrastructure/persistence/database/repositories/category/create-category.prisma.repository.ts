import { CreateCategoryRepository } from '@application/repositories/category'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { CreateCategoryDTO } from '@application/dtos/category'
import { Category } from '@domain/entities'
import { HttpException } from '@common/utils/exceptions'
import { ErrorMessage, ErrorName, StatusCode } from '@domain/enums'

export class CreateCategoryPrismaRepository
  implements CreateCategoryRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async create(body: CreateCategoryDTO): Promise<Category> {
    const product = await this.prisma.category.findMany({
      where: { name: body.name }
    })

    if (product.length > 0) {
      throw new HttpException(
        StatusCode.Conflict,
        ErrorName.ResourceAlreadyExists,
        ErrorMessage.CategoryExists
      )
    }

    return this.prisma.category.create({
      data: {
        name: body.name,
        description: body.description
      }
    })
  }
}
