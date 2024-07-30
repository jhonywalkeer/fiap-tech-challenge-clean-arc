import { ResponseHandler, HttpResponse } from '@presentation/protocols/http'

export class HttpGenericResponse<T> implements ResponseHandler<T> {
  async response(
    body: T,
    statusCode: number,
    message: string
  ): Promise<HttpResponse<T>> {
    const response: HttpResponse<T> = {
      body,
      statusCode
    }

    if (message) {
      response.message = message
    }

    return response
  }
}
