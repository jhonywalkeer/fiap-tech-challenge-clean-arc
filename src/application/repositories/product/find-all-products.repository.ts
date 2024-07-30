import { FindAllRepository } from '@common/types'
import { Repositories } from '@application/repositories/common'
import { Product } from '@domain/entities'

export interface FindAllProductRepository
  extends Omit<Repositories<Product[] | null>, FindAllRepository> {}
