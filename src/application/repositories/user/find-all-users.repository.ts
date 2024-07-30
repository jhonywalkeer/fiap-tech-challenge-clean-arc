import { FindAllRepository } from '@common/types'
import { Repositories } from '@application/repositories/common'
import { User } from '@domain/entities'

export interface FindAllUsersRepository
  extends Omit<Repositories<User[] | null>, FindAllRepository> {}
