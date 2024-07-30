import { FindAllCategoriesUC } from '@application/usecases/category'
import { Category } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindAllCategoriesPrismaRepository } from '@infrastructure/persistence/database/repositories/category'
import { FindAllCategoriesController } from '@presentation/controllers/category'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const FindAllCategoriesControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const categoryRepository = new FindAllCategoriesPrismaRepository(
    databaseConnection
  )
  const findAllCategoriesUseCase = new FindAllCategoriesUC(categoryRepository)
  const genericSucessPresenter = new HttpGenericResponse<Category[]>()
  const findAllCategoriesController = new FindAllCategoriesController(
    findAllCategoriesUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    categoryRepository,
    findAllCategoriesUseCase,
    findAllCategoriesController
  }
}
