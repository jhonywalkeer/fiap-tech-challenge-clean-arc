export interface OrderSchema {
  id: string
  order: string
  status: string
  observation: string | null
  customer: string
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
  user_id: string | null
}
