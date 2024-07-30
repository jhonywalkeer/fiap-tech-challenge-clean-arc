import { CreateProductDTO } from '@application/dtos/product'
import { CreateProductRepository } from '@application/repositories/product'
import { Product } from '@domain/entities'
import { CreateProductUseCase } from '@domain/usecases/product'

export class CreateProductUC implements CreateProductUseCase {
  constructor(
    private readonly createProductRepository: CreateProductRepository
  ) {}
  async execute(body: CreateProductDTO): Promise<Product> {
    return await this.createProductRepository.create(body)
  }
}
