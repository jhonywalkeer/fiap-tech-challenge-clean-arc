import { MercadoPagoConfig } from 'mercadopago'

export const MercadoPagoParams = {
  accessToken:
    'TEST-5164694067783074-073018-f28f040ef744041d11fdeb1350529f55-248693927' ||
    (process.env.MP_PUBLIC_KEY as string),
  options: {
    timeout: 5000,
    idempotencyKey: '<ANY>' || (process.env.MP_IDENPOTENCY_KEY as string)
  }
}

export const MercadoPagoClient = new MercadoPagoConfig(MercadoPagoParams)
