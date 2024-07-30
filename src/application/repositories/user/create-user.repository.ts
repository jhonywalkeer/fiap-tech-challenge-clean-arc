import { CreateRepository } from '@common/types'
import { Repositories } from '@application/repositories/common'
import { User } from '@domain/entities'

export interface CreateUserRepository
  extends Omit<Repositories<User>, CreateRepository> {}
