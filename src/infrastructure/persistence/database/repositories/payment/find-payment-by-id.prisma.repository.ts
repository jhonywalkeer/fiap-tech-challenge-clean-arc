import { FindPaymentByIdDTO } from '@application/dtos/payment'
import { FindPaymentByIdRepository } from '@application/repositories/payment'
import { Payment } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindPaymentByIdPrismaRepository
  implements FindPaymentByIdRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async findById(pathParameters: FindPaymentByIdDTO): Promise<Payment | null> {
    try {
      return await this.prisma.payment.findUnique({
        where: {
          id: pathParameters.id
        }
      })
    } catch (error) {
      return null
    }
  }
}
