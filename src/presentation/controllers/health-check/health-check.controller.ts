import { Controller } from '@presentation/protocols/controller'
import { ResponseHandler, HttpRequest } from '@presentation/protocols/http'

export class HealthCheckController implements Controller<any> {
  constructor(
    private readonly healthCheckUC: any,
    private readonly healthCheckPresenter: ResponseHandler<any>
  ) {}
  async handle(parameters: HttpRequest) {
    try {
      const healthCheck = await this.healthCheckUC.execute()
      return this.healthCheckPresenter.response(healthCheck)
    } catch (error) {
      return this.healthCheckPresenter.response(error)
    }
  }
}
