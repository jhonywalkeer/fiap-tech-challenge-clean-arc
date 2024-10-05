import { HttpRequest, HttpResponse } from '@presentation/protocols/http'

export interface Controller<T = unknown> {
  handle(request: HttpRequest): Promise<HttpResponse<T>>
}
