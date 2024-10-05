import { Repositories } from '@application/repositories/common'
import { CreateRepository } from '@common/types'
import { Payment } from '@domain/entities'

export interface CreatePaymentRepository
  extends Omit<Repositories<Payment>, CreateRepository> {}
