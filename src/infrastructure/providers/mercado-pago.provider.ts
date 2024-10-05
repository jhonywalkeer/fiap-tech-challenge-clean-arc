import { MercadoPagoBody, MercadoPagoResponse } from '@common/types'
import {
  MercadoPagoClient,
  MercadoPagoParams
} from '@infrastructure/config/mercado-pago.config'
import { Payment } from 'mercadopago'

export class MercadoPagoProvider {
  public async createPayment(
    body: MercadoPagoBody
  ): Promise<MercadoPagoResponse> {
    const payment = new Payment(MercadoPagoClient)

    try {
      const response = await payment.create({
        body: body,
        requestOptions: {
          idempotencyKey: MercadoPagoParams.options.idempotencyKey
        }
      })
      return response as unknown as MercadoPagoResponse
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
