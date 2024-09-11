import { CreateCategoryUC } from '@application/usecases/category'
import { Category } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  CreateCategoryPrismaRepository,
  FindCategoryByConditionPrismaRepository
} from '@infrastructure/persistence/database/repositories/category'
import { CreateCategoryController } from '@presentation/controllers/category'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const CreateCategoryControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const findCategoryByConditionRepository =
    new FindCategoryByConditionPrismaRepository(databaseConnection)
  const createCategoryRepository = new CreateCategoryPrismaRepository(
    databaseConnection
  )
  const createCategoryUseCase = new CreateCategoryUC(
    findCategoryByConditionRepository,
    createCategoryRepository
  )
  const genericSucessPresenter = new HttpGenericResponse<Category>()
  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    findCategoryByConditionRepository,
    createCategoryRepository,
    createCategoryUseCase,
    createCategoryController
  }
}
