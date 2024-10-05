import { Repositories } from '@application/repositories/common'
import { FindByConditionRepository } from '@common/types'
import { Payment } from '@domain/entities'

export interface FindPaymentByConditionRepository
  extends Omit<Repositories<Payment[] | null>, FindByConditionRepository> {}
