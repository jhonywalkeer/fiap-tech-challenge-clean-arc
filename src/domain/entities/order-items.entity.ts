export class OrderItems {
  product_id: string
  name?: string
  quantity: number
  price?: number
  amount?: number

  constructor(
    product_id: string,
    quantity: number,
    name?: string,
    price?: number,
    amount?: number
  ) {
    this.product_id = product_id
    this.quantity = quantity
    this.name = name
    this.price = price
    this.amount = amount
  }
}
