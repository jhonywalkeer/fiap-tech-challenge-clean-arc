import { Order } from '@domain/entities'
import { CreateOrderWithItems } from '@domain/interfaces/order'

export interface CreateOrderUseCase {
  execute(payload: CreateOrderWithItems): Promise<Order>
}
