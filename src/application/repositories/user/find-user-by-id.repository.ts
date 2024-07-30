import { FindByIdRepository } from '@common/types'
import { Repositories } from '@application/repositories/common'
import { User } from '@domain/entities'

export interface FindUserByIdRepository
  extends Omit<Repositories<User | null>, FindByIdRepository> {}
