import { DeleteCategoryDTO } from '@application/dtos/category'
import { DeleteCategoryRepository } from '@application/repositories/category'
import { HttpException } from '@common/utils/exceptions'
import { StatusCode, ErrorName } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindCategoryByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/category'

export class DeleteCategoryPrismaRepository
  implements DeleteCategoryRepository
{
  constructor(
    private readonly prisma: DatabaseConnection,
    private readonly findCategoryById: FindCategoryByIdPrismaRepository
  ) {}

  async delete(pathParameters: DeleteCategoryDTO): Promise<void> {
    const category = await this.findCategoryById.findById({
      id: pathParameters.id
    })

    if (category === null) {
      throw new HttpException(
        StatusCode.NoContent,
        ErrorName.NotFoundInformation,
        'Categoria já deletada ou inexistente'
      )
    }

    await this.prisma.category.delete({
      where: {
        id: pathParameters.id
      }
    })
  }
}
