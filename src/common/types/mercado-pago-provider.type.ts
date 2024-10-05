type MercadoPagoPayer = {
  email: string
}

export type MercadoPagoBody = {
  transaction_amount: number
  description: string
  payment_method_id: string
  payer: MercadoPagoPayer
}
