type MercadoPagoPayer = {
  email: string
}

type MercadoPagoIdentification = {
  type: string
  number: string
}

type MercadoPagoBody = {
  transaction_amount: number
  description: string
  payment_method_id: string
  payment_type_id: string
  payer: MercadoPagoPayer
  identification: MercadoPagoIdentification
}

export type MercadoPagoData = {
  body: MercadoPagoBody
}
