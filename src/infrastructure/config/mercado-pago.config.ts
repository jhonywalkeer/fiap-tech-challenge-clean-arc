import { MercadoPagoConfig } from 'mercadopago'

export const MercadoPagoClient = new MercadoPagoConfig({
  accessToken: process.env.MP_PUBLIC_KEY as string,
  options: {
    timeout: 5000,
    idempotencyKey: process.env.MP_IDENPOTENCY_KEY as string
  }
})
