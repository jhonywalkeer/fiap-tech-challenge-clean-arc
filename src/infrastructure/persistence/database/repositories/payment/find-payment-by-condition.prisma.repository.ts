import { FindPaymentByConditionDTO } from '@application/dtos/payment'
import { FindPaymentByConditionRepository } from '@application/repositories/payment'
import { Payment } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindPaymentByConditionPrismaRepository
  implements FindPaymentByConditionRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async findByCondition(
    pathParameters: FindPaymentByConditionDTO
  ): Promise<Payment[] | null> {
    try {
      return await this.prisma.payment.findMany({
        where: {
          order_id: {
            in: pathParameters.order_id
          }
        }
      })
    } catch (error) {
      return null
    }
  }
}
