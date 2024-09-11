import { DeleteCategoryUC } from '@application/usecases/category'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  FindCategoryByIdPrismaRepository,
  DeleteCategoryPrismaRepository
} from '@infrastructure/persistence/database/repositories/category'
import { DeleteProductController } from '@presentation/controllers/product'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const DeleteCategoryControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const findCategoryByIdRepository = new FindCategoryByIdPrismaRepository(
    databaseConnection
  )
  const categoryRepository = new DeleteCategoryPrismaRepository(
    databaseConnection
  )
  const deleteCategoryUseCase = new DeleteCategoryUC(
    findCategoryByIdRepository,
    categoryRepository
  )
  const genericSucessPresenter = new HttpGenericResponse<void>()
  const deleteCategoryController = new DeleteProductController(
    deleteCategoryUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    categoryRepository,
    deleteCategoryUseCase,
    deleteCategoryController
  }
}
