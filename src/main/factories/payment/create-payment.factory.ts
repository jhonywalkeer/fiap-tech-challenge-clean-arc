import { CreatePaymentUC } from '@application/usecases/payment'
import { Payment } from '@domain/entities'
import { PaymentExternal } from '@infrastructure/gateway/payment/payment-external.gateway'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindOrderByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/order'
import { FindOrderItemByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/order-item'
import {
  CreatePaymentPrismaRepository,
  FindPaymentByConditionPrismaRepository
} from '@infrastructure/persistence/database/repositories/payment'
import { FindProductByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/product'
import { MercadoPagoProvider } from '@infrastructure/providers/mercado-pago.provider'
import { CreatePaymentController } from '@presentation/controllers/payment/create-payment.controller'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const CreatePaymentControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const createPaymentRepository = new CreatePaymentPrismaRepository(
    databaseConnection
  )
  const findOrderItemByCondition = new FindOrderItemByConditionPrismaRepository(
    databaseConnection
  )
  const findProductByCondition = new FindProductByConditionPrismaRepository(
    databaseConnection
  )
  const findOrderByCondition = new FindOrderByConditionPrismaRepository(
    databaseConnection,
    findOrderItemByCondition,
    findProductByCondition
  )
  const findPaymentByCondition = new FindPaymentByConditionPrismaRepository(
    databaseConnection
  )

  const paymentExternal = new PaymentExternal(new MercadoPagoProvider())
  const createPaymentUseCase = new CreatePaymentUC(
    findOrderByCondition,
    findPaymentByCondition,
    paymentExternal,
    createPaymentRepository
  )
  const genericSucessPresenter = new HttpGenericResponse<Payment>()
  const createPaymentController = new CreatePaymentController(
    createPaymentUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    createPaymentRepository,
    createPaymentUseCase,
    createPaymentController
  }
}
