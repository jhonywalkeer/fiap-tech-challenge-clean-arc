import { DeleteCategoryDTO } from '@application/dtos/category'
import { DeleteCategoryRepository } from '@application/repositories/category'
import { DeleteOrNotExistsError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { StatusCode, ErrorName, Field } from '@domain/enums'
import { DeleteCategoryUseCase } from '@domain/usecases/category'
import { FindCategoryByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/category'

export class DeleteCategoryUC implements DeleteCategoryUseCase {
  constructor(
    private readonly findCategoryByIdRepository: FindCategoryByIdPrismaRepository,
    private readonly deleteCategoryRepository: DeleteCategoryRepository
  ) {}
  async execute(pathParameters: DeleteCategoryDTO): Promise<void> {
    const findCategory = await this.findCategoryByIdRepository.findById({
      id: pathParameters.id
    })

    if (!findCategory || findCategory === null) {
      throw new HttpException(
        StatusCode.NoContent,
        ErrorName.NotFoundInformation,
        DeleteOrNotExistsError(Field.Category)
      )
    }

    return await this.deleteCategoryRepository.delete(pathParameters)
  }
}
