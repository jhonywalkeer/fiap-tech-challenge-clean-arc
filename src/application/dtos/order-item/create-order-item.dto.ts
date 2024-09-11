import { Field } from '@domain/enums'
import { IsNumberValidator, IsStringValidator } from '@presentation/validators'

export class CreateOrderItemDTO {
  order_id: string
  product_id: string
  name: string
  price: number
  quantity: number
  amount: number

  constructor(
    order_id: string,
    product_id: string,
    name: string,
    price: number,
    quantity: number,
    amount: number
  ) {
    this.order_id = IsStringValidator(order_id, Field.OrderIdentifier)
    this.product_id = IsStringValidator(product_id, Field.ProductIdentifier)
    this.name = IsStringValidator(name, Field.Name)
    this.price = IsNumberValidator(price, Field.Price)
    this.quantity = IsNumberValidator(quantity, Field.Quantity)
    this.amount = IsNumberValidator(amount, Field.Amount)
  }
}
