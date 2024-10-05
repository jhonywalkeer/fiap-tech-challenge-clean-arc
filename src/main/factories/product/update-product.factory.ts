import { UpdateProductUC } from '@application/usecases/product'
import { Product } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindCategoryByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/category'
import {
  FindProductByIdPrismaRepository,
  UpdateProductPrismaRepository
} from '@infrastructure/persistence/database/repositories/product'
import { UpdateProductController } from '@presentation/controllers/product'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const UpdateProductControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const findProductById = new FindProductByIdPrismaRepository(
    databaseConnection
  )
  const findCategoryById = new FindCategoryByIdPrismaRepository(
    databaseConnection
  )
  const productRepository = new UpdateProductPrismaRepository(
    databaseConnection,
    findProductById
  )
  const updateProductUseCase = new UpdateProductUC(
    findProductById,
    findCategoryById,
    productRepository
  )
  const genericSucessPresenter = new HttpGenericResponse<Product>()
  const updateProductController = new UpdateProductController(
    updateProductUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    productRepository,
    updateProductUseCase,
    updateProductController
  }
}
