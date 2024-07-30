import { DeleteOrderDTO } from '@application/dtos/order'

export interface DeleteOrderUseCase {
  execute(pathParameters: DeleteOrderDTO): Promise<void>
}
