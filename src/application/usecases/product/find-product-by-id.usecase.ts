import { FindProductByIdDTO } from '@application/dtos/product'
import { FindProductByIdRepository } from '@application/repositories/product'
import { Product } from '@domain/entities'
import { FindProductByIdUseCase } from '@domain/usecases/product'

export class FindProductByIdUC implements FindProductByIdUseCase {
  constructor(
    private readonly findProductByIdRepository: FindProductByIdRepository
  ) {}
  async execute(pathParameters: FindProductByIdDTO): Promise<Product | null> {
    return await this.findProductByIdRepository.findById(pathParameters)
  }
}
