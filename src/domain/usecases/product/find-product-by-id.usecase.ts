import { FindProductByIdDTO } from '@application/dtos/product'
import { Product } from '@domain/entities'

export interface FindProductByIdUseCase {
  execute(pathParameters: FindProductByIdDTO): Promise<Product | null>
}
