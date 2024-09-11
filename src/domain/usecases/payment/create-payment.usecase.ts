import { CreatePaymentDTO } from '@application/dtos/payment'
import { Payment } from '@domain/entities'

export interface CreatePaymentUseCase {
  execute(body: CreatePaymentDTO): Promise<Payment> | never
}
