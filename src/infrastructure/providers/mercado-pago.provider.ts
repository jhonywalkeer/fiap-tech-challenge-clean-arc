import { MercadoPagoData } from '@common/types/mercado-pago-provider.type'
import { MercadoPagoClient } from '@infrastructure/config/mercado-pago.config'
import { Payment } from 'mercadopago'

export class MercadoPagoProvider {
  public async createPayment(data: MercadoPagoData): Promise<any> {
    const payment = new Payment(MercadoPagoClient)

    return payment.create(data)
  }
}

// { body: {
// 	transaction_amount: 12.34,
// 	description: '<DESCRIPTION>',
// 	payment_method_id: '<PAYMENT_METHOD_ID>',
// 	payer: {
// 		email: '<EMAIL>'
// 	},
// }}
