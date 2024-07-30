import { Application } from 'express'
import { serve, setup } from 'swagger-ui-express'
import { ExpressRateLimit, SwaggerDocumention } from '@main/framework'
import {
  CategoriesRoute,
  ProductsRoute,
  PaymentsRoute,
  OrdersRoute,
  UsersRoute
} from '@main/routes'

export const RouterFramework = (app: Application): void => {
  const routes = [
    {
      path: '/categories',
      middleware: ExpressRateLimit,
      handler: CategoriesRoute
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
