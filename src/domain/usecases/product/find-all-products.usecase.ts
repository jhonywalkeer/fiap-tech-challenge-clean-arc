import { FindAllProductsDTO } from '@application/dtos/product'
import { Product } from '@domain/entities'

export interface FindAllProductsUseCase {
  execute(queryParameters: FindAllProductsDTO): Promise<Product[] | null>
}
