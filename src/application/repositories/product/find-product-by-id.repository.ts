import { FindByIdRepository } from '@common/types'
import { Repositories } from '@application/repositories/common'
import { Product } from '@domain/entities'

export interface FindProductByIdRepository
  extends Omit<Repositories<Product | null>, FindByIdRepository> {}
