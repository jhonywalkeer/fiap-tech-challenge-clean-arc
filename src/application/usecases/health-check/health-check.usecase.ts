import { HealthCheckMap } from '@application/mappers/health-check.map'
import { ApplicationStatus } from '@common/enums'
import { HealthCheck } from '@domain/interfaces/health-check'
import { HealthCheckUseCase } from '@domain/usecases/health-check'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class HealthCheckUC implements HealthCheckUseCase {
  constructor(private readonly checkConnection: DatabaseConnection) {}

  async execute(): Promise<HealthCheck> {
    const healthCheck = await this.checkConnection.isConnected()
    let dbStatus = ApplicationStatus.Down
    let api = ApplicationStatus.Down

    if (healthCheck) {
      dbStatus = ApplicationStatus.Up
      api = ApplicationStatus.Up
    }

    return HealthCheckMap.execute(api, dbStatus)
  }
}
