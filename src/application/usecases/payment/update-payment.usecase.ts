import { UpdatePaymentDTO } from '@application/dtos/payment'
import { UpdatePaymentRepository } from '@application/repositories/payment'
import { Payment } from '@domain/entities'
import { UpdatePaymentUseCase } from '@domain/usecases/payment'

export class UpdatePaymentUC implements UpdatePaymentUseCase {
  constructor(
    private readonly updatePaymentRepository: UpdatePaymentRepository
  ) {}
  async execute(pathParameters: UpdatePaymentDTO): Promise<Payment | null> {
    return await this.updatePaymentRepository.update(pathParameters)
  }
}
