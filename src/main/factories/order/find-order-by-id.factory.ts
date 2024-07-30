import { FindOrderByIdUC } from '@application/usecases/order'
import { Order } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindOrderByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/order'
import { FindOrderByIdController } from '@presentation/controllers/order'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const FindOrderByIdControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const productRepository = new FindOrderByIdPrismaRepository(
    databaseConnection
  )
  const findOrderByIdUseCase = new FindOrderByIdUC(productRepository)
  const genericSucessPresenter = new HttpGenericResponse<Order>()
  const findOrderByIdController = new FindOrderByIdController(
    findOrderByIdUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    productRepository,
    findOrderByIdUseCase,
    findOrderByIdController
  }
}
