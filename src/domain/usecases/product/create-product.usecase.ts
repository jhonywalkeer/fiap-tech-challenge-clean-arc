import { CreateProductDTO } from '@application/dtos/product'
import { Product } from '@domain/entities'

export interface CreateProductUseCase {
  execute(body: CreateProductDTO): Promise<Product> | never
}
