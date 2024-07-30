import { UpdateProductDTO } from '@application/dtos/product'
import { Product } from '@domain/entities'

export interface UpdateProductUseCase {
  execute(pathParameters: UpdateProductDTO): Promise<Product | null>
}
