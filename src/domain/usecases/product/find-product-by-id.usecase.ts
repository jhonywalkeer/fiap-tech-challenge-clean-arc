import { Identifier } from '@common/interfaces'
import { Product } from '@domain/entities'

export interface FindProductByIdUseCase {
  execute(pathParameters: Identifier): Promise<Product>
}
