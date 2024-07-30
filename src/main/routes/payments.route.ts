import { ExpressRouteHttp } from '@main/adapters'
import { UpdatePaymentControllerFactory } from '@main/factories/payment'
import { Router } from 'express'

export const PaymentsRoute = Router()

const { updatePaymentController } = UpdatePaymentControllerFactory()

PaymentsRoute.put('/:id', ExpressRouteHttp(updatePaymentController))
