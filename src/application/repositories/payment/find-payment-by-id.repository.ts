import { FindByIdRepository } from '@common/types'
import { Repositories } from '@application/repositories/common'
import { Payment } from '@domain/entities'

export interface FindPaymentByIdRepository
  extends Omit<Repositories<Payment | null>, FindByIdRepository> {}
