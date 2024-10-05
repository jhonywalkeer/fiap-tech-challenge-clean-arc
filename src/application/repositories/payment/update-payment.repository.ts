import { Repositories } from '@application/repositories/common'
import { UpdateRepository } from '@common/types'
import { Payment } from '@domain/entities'

export interface UpdatePaymentRepository
  extends Omit<Repositories<Payment | null>, UpdateRepository> {}
