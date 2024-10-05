import { FindOrderByIdDTO } from '@application/dtos/order'
import { FindOrderByIdRepository } from '@application/repositories/order'
import { ErrorName, StatusCode } from '@common/enums'
import { NotFoundByIdError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Order } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindOrderByIdUseCase } from '@domain/usecases/order'

export class FindOrderByIdUC implements FindOrderByIdUseCase {
  constructor(
    private readonly findOrderByIdRepository: FindOrderByIdRepository
  ) {}

  async execute(pathParameters: FindOrderByIdDTO): Promise<Order> {
    const findOrder =
      await this.findOrderByIdRepository.findById(pathParameters)

    if (!findOrder) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        NotFoundByIdError(Field.Order)
      )
    }
    return findOrder
  }
}
