import { DeleteProductUC } from '@application/usecases/product'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  FindProductByIdPrismaRepository,
  DeleteProductPrismaRepository
} from '@infrastructure/persistence/database/repositories/product'
import { DeleteProductController } from '@presentation/controllers/product'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const DeleteProductControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const findProductById = new FindProductByIdPrismaRepository(
    databaseConnection
  )
  const productRepository = new DeleteProductPrismaRepository(
    databaseConnection,
    findProductById
  )
  const deleteProductUseCase = new DeleteProductUC(productRepository)
  const genericSucessPresenter = new HttpGenericResponse<void>()
  const deleteProductController = new DeleteProductController(
    deleteProductUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    productRepository,
    deleteProductUseCase,
    deleteProductController
  }
}
