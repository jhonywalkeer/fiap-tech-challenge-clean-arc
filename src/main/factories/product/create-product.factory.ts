import { CreateProductUC } from '@application/usecases/product'
import { Product } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { CreateProductPrismaRepository } from '@infrastructure/persistence/database/repositories/product'
import { CreateProductController } from '@presentation/controllers/product'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const CreateProductControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const productRepository = new CreateProductPrismaRepository(
    databaseConnection
  )
  const createproductUseCase = new CreateProductUC(productRepository)
  const genericSucessPresenter = new HttpGenericResponse<Product>()
  const createProductController = new CreateProductController(
    createproductUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    productRepository,
    createproductUseCase,
    createProductController
  }
}
