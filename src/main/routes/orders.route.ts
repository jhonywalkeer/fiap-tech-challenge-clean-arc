import { ExpressRouteHttp } from '@main/adapters'
import {
  CreateOrderControllerFactory,
  FindOrderByIdControllerFactory,
  FindAllOrdersControllerFactory,
  UpdateOrderControllerFactory,
  DeleteOrderControllerFactory
} from '@main/factories/order'
import { Router } from 'express'

export const OrdersRoute = Router()

const { createOrderController } = CreateOrderControllerFactory()
const { findOrderByIdController } = FindOrderByIdControllerFactory()
const { findAllOrdersController } = FindAllOrdersControllerFactory()
const { updateOrderController } = UpdateOrderControllerFactory()
const { deleteOrderController } = DeleteOrderControllerFactory()

OrdersRoute.post('/', ExpressRouteHttp(createOrderController))
OrdersRoute.get('/:id', ExpressRouteHttp(findOrderByIdController))
OrdersRoute.get('/', ExpressRouteHttp(findAllOrdersController))
OrdersRoute.patch('/:id', ExpressRouteHttp(updateOrderController))
OrdersRoute.put('/:id', ExpressRouteHttp(updateOrderController))
OrdersRoute.delete('/:id', ExpressRouteHttp(deleteOrderController))
