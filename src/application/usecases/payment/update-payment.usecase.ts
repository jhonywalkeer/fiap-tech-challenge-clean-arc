import { UpdatePaymentDTO } from '@application/dtos/payment'
import { FindOrderByConditionRepository } from '@application/repositories/order'
import {
  FindPaymentByIdRepository,
  UpdatePaymentRepository
} from '@application/repositories/payment'
import { ErrorName, StatusCode } from '@common/enums'
import { NotFoundByIdError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Payment } from '@domain/entities'
import { Field } from '@domain/enums'
import { UpdatePaymentUseCase } from '@domain/usecases/payment'

export class UpdatePaymentUC implements UpdatePaymentUseCase {
  constructor(
    private readonly findOrderByConditionRepository: FindOrderByConditionRepository,
    private readonly findPaymentByIdRepository: FindPaymentByIdRepository,
    private readonly updatePaymentRepository: UpdatePaymentRepository
  ) {}
  async execute(pathParameters: UpdatePaymentDTO): Promise<Payment> {
    const findOrder = await this.findOrderByConditionRepository.findByCondition(
      pathParameters.order_id
    )

    if (!findOrder) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        NotFoundByIdError(Field.Order)
      )
    }

    const findPayment = await this.findPaymentByIdRepository.findById(
      pathParameters.id
    )

    if (!findPayment) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        NotFoundByIdError(Field.Order)
      )
    }
    return await this.updatePaymentRepository.update(pathParameters)
  }
}
