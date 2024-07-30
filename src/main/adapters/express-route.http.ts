import { NextFunction, Request, Response } from 'express'
import { HttpException } from '@common/utils/exceptions'
import { Controller } from '@presentation/protocols/controller'

export const ExpressRouteHttp = <T>(controller: Controller<T>) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    return Promise.resolve(
      controller.handle({
        query: request.query,
        params: request.params,
        body: request.body,
        headers: request.headers
      })
    )
      .then((controllerResponse) => {
        if (
          request.method === 'GET' &&
          request.query.page &&
          request.query.limit
        ) {
          response.status(controllerResponse.statusCode).json({
            page: Number(request.query.page),
            limit: Number(request.query.limit),
            data: controllerResponse.body
          })
        } else {
          response
            .status(controllerResponse.statusCode)
            .json({ data: controllerResponse.body })
        }
        return next()
      })
      .catch((error) => {
        if (error instanceof HttpException) {
          response.status(error.statusCode).json({
            status_code: error.statusCode,
            name: error.name,
            message: error.message
          })
        }
      })
  }
}
