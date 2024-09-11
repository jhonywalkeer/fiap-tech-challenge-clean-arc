export class OrderItem {
  order_id?: string
  product_id: string
  name: string
  quantity: number
  price: number
  amount: number

  constructor(
    product_id: string,
    quantity: number,
    name: string,
    price: number,
    amount: number,
    order_id: string
  ) {
    this.product_id = product_id
    this.quantity = quantity
    this.name = name
    this.price = price
    this.amount = amount
    this.order_id = order_id
  }
}
