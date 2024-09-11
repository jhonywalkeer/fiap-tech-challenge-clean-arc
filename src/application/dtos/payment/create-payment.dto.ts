import { IsNumberValidator, IsStringValidator } from '@presentation/validators'
import { CreatePaymentPayerDTO } from './create-payment-payer.dto'
import { Field } from '@domain/enums'

export class CreatePaymentDTO {
  transaction_amount: number
  description: string
  payment_method: string
  payer: CreatePaymentPayerDTO

  constructor(
    transaction_amount: number,
    description: string,
    payment_method: string,
    payer: CreatePaymentPayerDTO
  ) {
    IsNumberValidator(transaction_amount, Field.TransactionAmount)
    IsStringValidator(description, Field.Description)
    IsStringValidator(payment_method, Field.Method)

    this.transaction_amount = transaction_amount
    this.description = description
    this.payment_method = payment_method
    this.payer = payer
  }
}

// { body: {
// 	transaction_amount: 12.34,
// 	description: '<DESCRIPTION>',
// 	payment_method_id: '<PAYMENT_METHOD_ID>',
// 	payer: {
// 		email: '<EMAIL>'
// 	},
// },
