import { Order } from '@domain/entities'
import { UpdateOrderWithItems } from '@domain/interfaces/order/update-order-with-items.interface'

export interface UpdateOrderUseCase {
  execute(payload: UpdateOrderWithItems): Promise<Order>
}
