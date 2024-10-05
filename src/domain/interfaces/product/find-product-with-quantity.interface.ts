import { Product } from './product.interface'

export interface FindProductWithQuantity {
  product_id: string
  quantity: number
  product?: Product[]
}
