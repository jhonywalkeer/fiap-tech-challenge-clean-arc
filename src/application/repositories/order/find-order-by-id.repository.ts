import { FindByIdRepository } from '@common/types/repositories.type'
import { Repositories } from '@core/application/ports/out'
import { Order } from '@core/domain/entities'

export interface FindOrderByIdRepository
  extends Omit<Repositories<Order | null>, FindByIdRepository> {}
