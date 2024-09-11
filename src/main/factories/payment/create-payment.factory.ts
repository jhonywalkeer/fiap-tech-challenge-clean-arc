import { CreatePaymentUC } from '@application/usecases/payment'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export const CreatePaymentControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const createPaymentRepository = new CreatePaymentPrismaRepository(
    databaseConnection
  )
  const createPaymentUseCase = new CreatePaymentUC(createPaymentRepository)

  return {
    databaseConnection,
    createPaymentRepository,
    createPaymentUseCase
  }
}
