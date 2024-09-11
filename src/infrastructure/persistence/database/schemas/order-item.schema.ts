export interface OrderItemsSchema {
  id?: string
  order_id?: string
  product_id?: string
  name?: string
  quantity: number
  price?: number
  amount?: number
  created_at?: Date
  updated_at?: Date
}
