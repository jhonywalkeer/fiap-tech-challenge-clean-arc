import { ExpressRouteAdapter } from '@main/adapters'
import {
  CreatePaymentControllerFactory,
  UpdatePaymentControllerFactory
} from '@main/factories/payment'
import { Router } from 'express'

export const PaymentsRoute = Router()

const { createPaymentController } = CreatePaymentControllerFactory()
const { updatePaymentController } = UpdatePaymentControllerFactory()

PaymentsRoute.post('/', ExpressRouteAdapter(createPaymentController))
PaymentsRoute.put('/:id', ExpressRouteAdapter(updatePaymentController))
