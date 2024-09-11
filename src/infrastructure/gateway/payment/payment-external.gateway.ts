import { CreatePaymentDTO } from '@application/dtos/payment'
import { MercadoPagoProvider } from '@infrastructure/providers/mercado-pago.provider'

export interface PaymentExternalGateway {
  create(order: any): Promise<string>
}

export class PaymentExternal implements PaymentExternalGateway {
  private readonly mercadoPagoProvider: MercadoPagoProvider

  public async create(order: CreatePaymentDTO): Promise<any> {
    const paymentMethod = order.payment_method
    const paymentId = paymentMethod
    return await this.mercadoPagoProvider.createPayment({
      body: {
        transaction_amount: order.transaction_amount,
        description: order.description,
        payment_method_id: paymentId,
        payment_type_id: 'credit_card',
        payer: {
          email: order.payer.email
        },
        identification: {
          type: 'CPF',
          number: '19119119100'
        }
      }
    })
  }
}
