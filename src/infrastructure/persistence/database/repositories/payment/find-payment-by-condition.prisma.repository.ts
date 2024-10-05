import { FindPaymentByConditionDTO } from '@application/dtos/payment'
import { FindPaymentByConditionRepository } from '@application/repositories/payment'
import { ErrorName, StatusCode } from '@common/enums'
import { NotFoundByIdError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Payment } from '@domain/entities'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindPaymentByConditionPrismaRepository
  implements FindPaymentByConditionRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async findByCondition(
    pathParameters: FindPaymentByConditionDTO
  ): Promise<Payment[] | null> {
    try {
      const findPayments = await this.prisma.payment.findMany({
        where: {
          order_id: {
            in: pathParameters.order_id
          }
        }
      })
      return !findPayments || findPayments.length === 0 ? null : findPayments
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        NotFoundByIdError(Field.Payment)
      )
    }
  }
}
