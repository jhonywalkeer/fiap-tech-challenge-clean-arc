import { HealthCheckUC } from '@application/usecases/health-check/health-check.usecase'
import { HealthCheck } from '@domain/interfaces/health-check'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { HealthCheckController } from '@presentation/controllers/health-check'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const HealthCheckControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const healthCheckUseCase = new HealthCheckUC(databaseConnection)
  const genericSucessPresenter = new HttpGenericResponse<HealthCheck>()
  const healthCheckController = new HealthCheckController(
    healthCheckUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    healthCheckUseCase,
    healthCheckController
  }
}
