import { DeleteOrderDTO } from '@application/dtos/order'
import { DeleteOrderRepository } from '@application/repositories/order'
import { DeleteOrderUseCase } from '@domain/usecases/order'

export class DeleteOrderUC implements DeleteOrderUseCase {
  constructor(private readonly deleteOrderRepository: DeleteOrderRepository) {}
  async execute(pathParameters: DeleteOrderDTO): Promise<void> {
    return await this.deleteOrderRepository.delete(pathParameters)
  }
}
