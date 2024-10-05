import { FindAllOrdersRepository } from '@application/repositories/order'
import { ErrorName, StatusCode } from '@common/enums'
import { NotFoundAllError } from '@common/errors'
import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { HttpException } from '@common/utils/exceptions'
import { Order } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindAllOrdersUseCase } from '@domain/usecases/order'

export class FindAllOrdersUC implements FindAllOrdersUseCase {
  constructor(
    private readonly findAllOrdersRepository: FindAllOrdersRepository
  ) {}

  async execute(
    queryParameters: PaginationAndFilter
  ): Promise<PaginateResponse<Order>> {
    const findOrders =
      await this.findAllOrdersRepository.findAll(queryParameters)

    if (!findOrders) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        NotFoundAllError(Field.Order)
      )
    }

    return findOrders
  }
}
