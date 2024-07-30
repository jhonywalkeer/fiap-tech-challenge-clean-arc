import { UpdateOrderDTO } from '@application/dtos/order'
import { Order } from '@domain/entities'

export interface UpdateOrderUseCase {
  execute(pathParameters: UpdateOrderDTO): Promise<Order | null>
}
