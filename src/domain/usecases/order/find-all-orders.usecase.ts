import { FindAllOrdersDTO } from '@application/dtos/order'
import { Order } from '@domain/entities'

export interface FindAllOrdersUseCase {
  execute(queryParameters: FindAllOrdersDTO): Promise<Order[]>
}
