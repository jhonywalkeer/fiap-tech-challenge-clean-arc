import { CreateProductUC } from '@application/usecases/product'
import { Product } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindCategoryByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/category'
import {
  CreateProductPrismaRepository,
  FindProductByConditionPrismaRepository
} from '@infrastructure/persistence/database/repositories/product'
import { CreateProductController } from '@presentation/controllers/product'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const CreateProductControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const createProductRepository = new CreateProductPrismaRepository(
    databaseConnection
  )
  const findProductByConditionRepository =
    new FindProductByConditionPrismaRepository(databaseConnection)
  const findCategoryById = new FindCategoryByIdPrismaRepository(
    databaseConnection
  )
  const createProductUseCase = new CreateProductUC(
    findProductByConditionRepository,
    findCategoryById,
    createProductRepository
  )
  const genericSucessPresenter = new HttpGenericResponse<Product>()
  const createProductController = new CreateProductController(
    createProductUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    createProductRepository,
    createProductUseCase,
    createProductController
  }
}
