import { Field } from '@domain/enums'
import { IsNumberValidator, IsStringValidator } from '@presentation/validators'

export class CreateOrderItemsDTO {
  product_id: string
  quantity: number

  constructor(product_id: string, quantity: number) {
    this.product_id = IsStringValidator(product_id, Field.productIdentifier)
    this.quantity = IsNumberValidator(quantity, Field.quantity)
  }
}
