import { UpdateOrderUC } from '@application/usecases/order'
import { Order } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  FindOrderByIdPrismaRepository,
  UpdateOrderPrismaRepository
} from '@infrastructure/persistence/database/repositories/order'
import { UpdateOrderController } from '@presentation/controllers/order'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const UpdateOrderControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const findOrderById = new FindOrderByIdPrismaRepository(databaseConnection)
  const orderRepository = new UpdateOrderPrismaRepository(
    databaseConnection,
    findOrderById
  )
  const updateOrderUseCase = new UpdateOrderUC(orderRepository)
  const genericSucessPresenter = new HttpGenericResponse<Order>()
  const updateOrderController = new UpdateOrderController(
    updateOrderUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    orderRepository,
    updateOrderUseCase,
    updateOrderController
  }
}
