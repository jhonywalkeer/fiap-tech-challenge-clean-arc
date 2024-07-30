import { UpdateRepository } from '@common/types'
import { Repositories } from '@application/repositories/common'
import { Product } from '@domain/entities'

export interface UpdateProductRepository
  extends Omit<Repositories<Product | null>, UpdateRepository> {}
