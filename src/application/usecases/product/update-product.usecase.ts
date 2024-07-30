import { UpdateProductDTO } from '@application/dtos/product'
import { UpdateProductRepository } from '@application/repositories/product'
import { Product } from '@domain/entities'
import { UpdateProductUseCase } from '@domain/usecases/product'

export class UpdateProductUC implements UpdateProductUseCase {
  constructor(
    private readonly updateProductRepository: UpdateProductRepository
  ) {}
  async execute(pathParameters: UpdateProductDTO): Promise<Product | null> {
    return await this.updateProductRepository.update(pathParameters)
  }
}
