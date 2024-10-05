import { ExpressRateLimit, SwaggerDocumention } from '@main/framework'
import {
  CategoriesRoute,
  HealthCheckRoute,
  ProductsRoute,
  PaymentsRoute,
  OrdersRoute,
  UsersRoute
} from '@main/routes'
import { Application } from 'express'
import { serve, setup } from 'swagger-ui-express'

export const RouterFramework = (app: Application): void => {
  const routes = [
    {
      path: '/categories',
      middleware: ExpressRateLimit,
      handler: CategoriesRoute
    },
    {
      path: '/health',
      middleware: ExpressRateLimit,
      handler: HealthCheckRoute
    },
    { path: '/products', middleware: ExpressRateLimit, handler: ProductsRoute },
    { path: '/payments', middleware: ExpressRateLimit, handler: PaymentsRoute },
    { path: '/orders', middleware: ExpressRateLimit, handler: OrdersRoute },
    { path: '/users', middleware: ExpressRateLimit, handler: UsersRoute }
  ]

  routes.forEach((route) => {
    app.use(route.path, route.middleware, route.handler)
    app.use('/docs', serve, setup(SwaggerDocumention))
  })
}
