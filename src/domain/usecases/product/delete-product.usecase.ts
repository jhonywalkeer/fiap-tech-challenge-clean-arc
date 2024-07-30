import { DeleteProductDTO } from '@application/dtos/product'

export interface DeleteProductUseCase {
  execute(pathParameters: DeleteProductDTO): Promise<void>
}
