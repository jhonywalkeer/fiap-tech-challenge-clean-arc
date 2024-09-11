import { FindOrderByIdDTO } from '@application/dtos/order'
import { FindOrderByIdRepository } from '@application/repositories/order'
import { Order } from '@domain/entities'
import { FindOrderByIdUseCase } from '@domain/usecases/order'

export class FindOrderByIdUC implements FindOrderByIdUseCase {
  constructor(
    private readonly findOrderByIdRepository: FindOrderByIdRepository
  ) {}

  async execute(pathParameters: FindOrderByIdDTO): Promise<Order | null> {
    return await this.findOrderByIdRepository.findById(pathParameters)
  }
}
