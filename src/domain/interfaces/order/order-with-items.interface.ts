export interface OrderWithItems {
  id: string
  order: string
  status: string
  observation: string
  customer: Customer
  payment_id: null
  items: Items[]
}

export interface Customer {
  id: string
  name: string
}

export interface Items {
  product: Product
}

export interface Product {
  id: string
  name: string
  price: number
  amount: number
}
