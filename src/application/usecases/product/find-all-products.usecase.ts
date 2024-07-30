import { FindAllProductsDTO } from '@application/dtos/product'
import { FindAllProductRepository } from '@application/repositories/product'
import { Product } from '@domain/entities'
import { FindAllProductsUseCase } from '@domain/usecases/product'

export class FindAllProductsUC implements FindAllProductsUseCase {
  constructor(
    private readonly findAllUsersRepository: FindAllProductRepository
  ) {}
  async execute(
    queryParameters: FindAllProductsDTO
  ): Promise<Product[] | null> {
    return await this.findAllUsersRepository.findAll(queryParameters)
  }
}
