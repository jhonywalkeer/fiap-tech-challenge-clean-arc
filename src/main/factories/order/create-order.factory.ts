import { CreateOrderUC } from '@application/usecases/order'
import { Order } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { CreateOrderPrismaRepository } from '@infrastructure/persistence/database/repositories/order'
import { CreateOrderController } from '@presentation/controllers/order'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const CreateOrderControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const orderRepository = new CreateOrderPrismaRepository(databaseConnection)
  const createOrderUseCase = new CreateOrderUC(orderRepository)
  const genericSucessPresenter = new HttpGenericResponse<Order>()
  const createOrderController = new CreateOrderController(
    createOrderUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    orderRepository,
    createOrderUseCase,
    createOrderController
  }
}
