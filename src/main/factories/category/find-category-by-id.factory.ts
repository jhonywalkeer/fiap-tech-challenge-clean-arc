import { FindCategoryByIdUC } from '@application/usecases/category'
import { Category } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindCategoryByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/category'
import { FindCategoryByIdController } from '@presentation/controllers/category'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const FindCategoryByIdControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const categoryRepository = new FindCategoryByIdPrismaRepository(
    databaseConnection
  )
  const findCategoryByIdUseCase = new FindCategoryByIdUC(categoryRepository)
  const genericSucessPresenter = new HttpGenericResponse<Category>()
  const findCategoryByIdController = new FindCategoryByIdController(
    findCategoryByIdUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    categoryRepository,
    findCategoryByIdUseCase,
    findCategoryByIdController
  }
}
