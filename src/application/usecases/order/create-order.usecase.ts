import { CreateOrderDTO } from '@application/dtos/order'
import { CreateOrderRepository } from '@application/repositories/order'
import { Order } from '@domain/entities'
import { CreateOrderUseCase } from '@domain/usecases/order'

export class CreateOrderUC implements CreateOrderUseCase {
  constructor(private readonly createOrderRepository: CreateOrderRepository) {}
  async execute(body: CreateOrderDTO): Promise<Order> | never {
    return await this.createOrderRepository.create(body)
  }
}
