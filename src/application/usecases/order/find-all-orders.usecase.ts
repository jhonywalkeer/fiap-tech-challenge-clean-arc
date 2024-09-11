import { FindAllOrdersDTO } from '@application/dtos/order'
import { FindAllOrdersRepository } from '@application/repositories/order'
import { NotFoundAllError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Order } from '@domain/entities'
import { ErrorName, Field, StatusCode } from '@domain/enums'
import { FindAllOrdersUseCase } from '@domain/usecases/order'

export class FindAllOrdersUC implements FindAllOrdersUseCase {
  constructor(
    private readonly findAllOrdersRepository: FindAllOrdersRepository
  ) {}

  async execute(queryParameters: FindAllOrdersDTO): Promise<Order[]> {
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
