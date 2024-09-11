import { CreateOrderUC } from '@application/usecases/order'
import { Order } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  CreateOrderPrismaRepository,
  FindOrderByIdPrismaRepository
} from '@infrastructure/persistence/database/repositories/order'
import {
  FindOrderItemByConditionPrismaRepository,
  CreateOrderItemPrismaRepository
} from '@infrastructure/persistence/database/repositories/order-item'
import { FindPaymentByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/payment'
import { FindProductByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/product'
import { FindUserByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/user'
import { CreateOrderController } from '@presentation/controllers/order'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const CreateOrderControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const userRepository = new FindUserByIdPrismaRepository(databaseConnection)
  const productRepository = new FindProductByConditionPrismaRepository(
    databaseConnection
  )
  const paymentRepository = new FindPaymentByConditionPrismaRepository(
    databaseConnection
  )
  const orderItemRepository = new CreateOrderItemPrismaRepository(
    databaseConnection
  )
  const findOrderItemRepository = new FindOrderItemByConditionPrismaRepository(
    databaseConnection
  )
  const findOrderRepository = new FindOrderByIdPrismaRepository(
    databaseConnection,
    paymentRepository,
    findOrderItemRepository,
    productRepository
  )

  const orderRepository = new CreateOrderPrismaRepository(
    databaseConnection,
    findOrderRepository,
    paymentRepository
  )

  const createOrderUseCase = new CreateOrderUC(
    userRepository,
    productRepository,
    orderRepository,
    orderItemRepository,
    findOrderRepository,
    paymentRepository
  )
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
