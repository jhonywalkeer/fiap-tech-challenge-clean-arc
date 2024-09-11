export interface PaymentSchema {
  id?: string
  order_id?: string
  user_id?: string | null
  payment_method?: string
  amount?: number
  payment_date?: Date | null
  created_at?: Date
  status?: string
  qr_code?: string
}
