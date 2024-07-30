import { DeleteProductDTO } from '@application/dtos/product'
import { DeleteProductRepository } from '@application/repositories/product'
import { DeleteProductUseCase } from '@domain/usecases/product'

export class DeleteProductUC implements DeleteProductUseCase {
  constructor(
    private readonly deleteProductRepository: DeleteProductRepository
  ) {}
  async execute(pathParameters: DeleteProductDTO): Promise<void> {
    return await this.deleteProductRepository.delete(pathParameters)
  }
}
