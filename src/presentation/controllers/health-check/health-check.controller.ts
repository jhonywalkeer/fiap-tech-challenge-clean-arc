import { ApplicationStatus, StatusCode } from '@common/enums'
import { HealthCheck } from '@domain/interfaces/health-check'
import { HealthCheckUseCase } from '@domain/usecases/health-check'
import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class HealthCheckController implements Controller<HealthCheck> {
  constructor(
    private readonly healthCheckUC: HealthCheckUseCase,
    private readonly healthCheckPresenter: ResponseHandler<HealthCheck>
  ) {}
  async handle(request: HttpRequest) {
    console.log('HealthCheckController.handle', request.params)
    const healthCheck: HealthCheck = await this.healthCheckUC.execute()
    return this.healthCheckPresenter.response(
      healthCheck,
      healthCheck.status === ApplicationStatus.Up
        ? StatusCode.Sucess
        : StatusCode.ServiceUnavailable
    )
  }
}
