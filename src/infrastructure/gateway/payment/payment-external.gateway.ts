import { CreatePaymentDTO } from '@application/dtos/payment'
import { MercadoPagoResponse } from '@common/types'
import { MercadoPagoProvider } from '@infrastructure/providers/mercado-pago.provider'

export interface PaymentExternalGateway {
  create(order: CreatePaymentDTO): Promise<MercadoPagoResponse | undefined>
}

export class PaymentExternal implements PaymentExternalGateway {
  constructor(
    private readonly mercadoPagoProvider = new MercadoPagoProvider()
  ) {}

  public async create(
    order: CreatePaymentDTO
  ): Promise<MercadoPagoResponse | undefined> {
    console.log(order)
    try {
      const payment: MercadoPagoResponse =
        await this.mercadoPagoProvider.createPayment({
          transaction_amount: order.transaction_amount,
          description: order.description,
          payment_method_id: order.payment_method,
          payer: {
            email: order.payer.email
          }
        })
      return payment
    } catch (error) {
      console.log(error)
    }
  }
}
