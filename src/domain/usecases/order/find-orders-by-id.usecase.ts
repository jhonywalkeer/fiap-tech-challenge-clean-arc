import { Identifier } from '@common/interfaces'
import { Order } from '@domain/entities'

export interface FindOrderByIdUseCase {
  execute(pathParameters: Identifier): Promise<Order>
}
