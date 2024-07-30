import { FindOrderByIdDTO } from '@application/dtos/order'
import { Order } from '@domain/entities'

export interface FindOrderByIdUseCase {
  execute(pathParameters: FindOrderByIdDTO): Promise<Order | null>
}
