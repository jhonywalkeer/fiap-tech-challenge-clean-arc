import { Field } from '@domain/enums'
import { IsNumberValidator, IsStringValidator } from '@presentation/validators'

import { CreatePaymentPayerDTO } from './create-payment-payer.dto'

export class CreatePaymentDTO {
  order_id: string
  transaction_amount: number
  description: string
  payment_method: string
  payer: CreatePaymentPayerDTO
  qr_code?: string
  status?: string

  constructor(
    order_id: string,
    transaction_amount: number,
    description: string,
    payment_method: string,
    payer: CreatePaymentPayerDTO,
    qr_code?: string,
    status?: string
  ) {
    IsNumberValidator(transaction_amount, Field.TransactionAmount)
    IsStringValidator(description, Field.Description)

    this.order_id = order_id
    this.transaction_amount = transaction_amount
    this.description = description
    this.payment_method = payment_method
    this.payer = payer
    this.qr_code = qr_code
    this.status = status
  }
}
