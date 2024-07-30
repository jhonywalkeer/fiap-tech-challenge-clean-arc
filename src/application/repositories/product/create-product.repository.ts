import { CreateRepository } from '@common/types'
import { Repositories } from '@application/repositories/common'
import { Product } from '@domain/entities'

export interface CreateProductRepository
  extends Omit<Repositories<Product>, CreateRepository> {}
