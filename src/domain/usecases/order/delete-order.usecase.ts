import { Identifier } from '@common/interfaces'

export interface DeleteOrderUseCase {
  execute(payload: Identifier): Promise<void>
}
