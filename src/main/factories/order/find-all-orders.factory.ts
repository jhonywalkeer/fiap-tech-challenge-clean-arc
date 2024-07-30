import { FindAllOrdersUC } from '@application/usecases/order'
import { Order } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindAllOrdersPrismaRepository } from '@infrastructure/persistence/database/repositories/order'
import { FindAllOrdersController } from '@presentation/controllers/order'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const FindAllOrdersControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const orderRepository = new FindAllOrdersPrismaRepository(databaseConnection)
  const findAllOrdersUseCase = new FindAllOrdersUC(orderRepository)
  const genericSucessPresenter = new HttpGenericResponse<Order[]>()
  const findAllOrdersController = new FindAllOrdersController(
    findAllOrdersUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    orderRepository,
    findAllOrdersUseCase,
    findAllOrdersController
  }
}
