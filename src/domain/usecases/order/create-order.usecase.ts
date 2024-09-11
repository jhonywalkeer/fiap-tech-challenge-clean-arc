import { CreateOrderWithItemsDTO } from '@application/dtos/order'
import { Order } from '@domain/entities'

export interface CreateOrderUseCase {
  execute(body: CreateOrderWithItemsDTO): Promise<Order>
}
