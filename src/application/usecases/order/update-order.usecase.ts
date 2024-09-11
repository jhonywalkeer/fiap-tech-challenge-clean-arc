import { UpdateOrderDTO } from '@application/dtos/order'
import { UpdateOrderRepository } from '@application/repositories/order'
import { Order } from '@domain/entities'
import { UpdateOrderUseCase } from '@domain/usecases/order'

export class UpdateOrderUC implements UpdateOrderUseCase {
  constructor(private readonly updateOrderRepository: UpdateOrderRepository) {}

  async execute(pathParameters: UpdateOrderDTO): Promise<Order | null> {
    return await this.updateOrderRepository.update(pathParameters)
  }
}
