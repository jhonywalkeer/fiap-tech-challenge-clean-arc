import { DeleteOrderUC } from '@application/usecases/order'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  FindOrderByIdPrismaRepository,
  DeleteOrderPrismaRepository
} from '@infrastructure/persistence/database/repositories/order'
import { FindOrderItemByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/order-item'
import { FindPaymentByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/payment'
import { FindProductByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/product'
import { DeleteOrderController } from '@presentation/controllers/order'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const DeleteOrderControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const productRepository = new FindProductByConditionPrismaRepository(
    databaseConnection
  )
  const paymentRepository = new FindPaymentByConditionPrismaRepository(
    databaseConnection
  )
  const orderItemRepository = new FindOrderItemByConditionPrismaRepository(
    databaseConnection
  )
  const findOrderRepository = new FindOrderByIdPrismaRepository(
    databaseConnection,
    paymentRepository,
    orderItemRepository,
    productRepository
  )
  const orderRepository = new DeleteOrderPrismaRepository(
    databaseConnection,
    findOrderRepository
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
