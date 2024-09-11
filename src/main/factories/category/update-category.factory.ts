import { UpdateCategoryUC } from '@application/usecases/category'
import { Category } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  FindCategoryByIdPrismaRepository,
  UpdateCategoryPrismaRepository
} from '@infrastructure/persistence/database/repositories/category'
import { UpdateCategoryController } from '@presentation/controllers/category'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const UpdateCategoryControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const findCategoryById = new FindCategoryByIdPrismaRepository(
    databaseConnection
  )
  const categoryRepository = new UpdateCategoryPrismaRepository(
    databaseConnection,
    findCategoryById
  )
  const updateCategoryUseCase = new UpdateCategoryUC(
    findCategoryById,
    categoryRepository
  )
  const genericSucessPresenter = new HttpGenericResponse<Category>()
  const updateCategoryController = new UpdateCategoryController(
    updateCategoryUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    categoryRepository,
    updateCategoryUseCase,
    updateCategoryController
  }
}
