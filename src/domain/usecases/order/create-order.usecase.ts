import { CreateOrderDTO } from '@application/dtos/order'
import { Order } from '@domain/entities'

export interface CreateOrderUseCase {
  execute(body: CreateOrderDTO): Promise<Order> | never
}
