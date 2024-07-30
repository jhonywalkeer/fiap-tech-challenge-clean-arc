import { UpdatePaymentUC } from '@application/usecases/payment'
import { Payment } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { UpdatePaymentPrismaRepository } from '@infrastructure/persistence/database/repositories/payment'
import { UpdatePaymentController } from '@presentation/controllers/payment'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const UpdatePaymentControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const paymentRepository = new UpdatePaymentPrismaRepository(
    databaseConnection
  )
  const updatePaymentUseCase = new UpdatePaymentUC(paymentRepository)
  const genericSucessPresenter = new HttpGenericResponse<Payment>()
  const updatePaymentController = new UpdatePaymentController(
    updatePaymentUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    paymentRepository,
    updatePaymentUseCase,
    updatePaymentController
  }
}
