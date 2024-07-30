import { DeleteOrderUC } from '@application/usecases/order'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  FindOrderByIdPrismaRepository,
  DeleteOrderPrismaRepository
} from '@infrastructure/persistence/database/repositories/order'
import { DeleteOrderController } from '@presentation/controllers/order'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const DeleteOrderControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const findOrderById = new FindOrderByIdPrismaRepository(databaseConnection)
  const orderRepository = new DeleteOrderPrismaRepository(
    databaseConnection,
    findOrderById
  )
  const deleteOrderUseCase = new DeleteOrderUC(orderRepository)
  const genericSucessPresenter = new HttpGenericResponse<void>()
  const deleteOrderController = new DeleteOrderController(
    deleteOrderUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    orderRepository,
    deleteOrderUseCase,
    deleteOrderController
  }
}
