import { UpdatePaymentDTO } from '@application/dtos/payment'
import { Payment } from '@domain/entities'

export interface UpdatePaymentUseCase {
  execute(pathParameters: UpdatePaymentDTO): Promise<Payment | null>
}
