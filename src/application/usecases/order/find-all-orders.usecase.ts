import { FindAllOrdersDTO } from '@application/dtos/order'
import { FindAllOrdersRepository } from '@application/repositories/order'
import { Order } from '@domain/entities'
import { FindAllOrdersUseCase } from '@domain/usecases/order'

export class FindAllOrdersUC implements FindAllOrdersUseCase {
  constructor(
    private readonly findAllOrdersRepository: FindAllOrdersRepository
  ) {}
  async execute(queryParameters: FindAllOrdersDTO): Promise<Order[] | null> {
    return await this.findAllOrdersRepository.findAll(queryParameters)
  }
}
