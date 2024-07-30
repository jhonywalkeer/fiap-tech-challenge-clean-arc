import { HttpResponse } from '@presentation/protocols/http'

export interface ResponseHandler<T = any> {
  response(
    body: T,
    statusCode?: number,
    message?: string
  ): Promise<HttpResponse<T>>
}