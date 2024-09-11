import { FindByConditionRepository } from '@common/types'
import { Repositories } from '@application/repositories/common'
import { Payment } from '@domain/entities'

export interface FindPaymentByConditionRepository
  extends Omit<Repositories<Payment[] | null>, FindByConditionRepository> {}
