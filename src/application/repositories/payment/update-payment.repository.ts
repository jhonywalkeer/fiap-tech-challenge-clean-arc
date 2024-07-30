import { UpdateRepository } from '@common/types'
import { Repositories } from '@application/repositories/common'
import { Payment } from '@domain/entities'

export interface UpdatePaymentRepository
  extends Omit<Repositories<Payment | null>, UpdateRepository> {}
