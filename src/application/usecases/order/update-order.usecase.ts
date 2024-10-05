import { UpdateOrderDTO } from '@application/dtos/order'
import {
  FindOrderByIdRepository,
  UpdateOrderRepository
} from '@application/repositories/order'
import { ErrorName, StatusCode } from '@common/enums'
import { NotFoundByIdError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Order } from '@domain/entities'
import { Field } from '@domain/enums'
import { UpdateOrderUseCase } from '@domain/usecases/order'

export class UpdateOrderUC implements UpdateOrderUseCase {
  constructor(
    private readonly findOrderByIdRepository: FindOrderByIdRepository,
    private readonly updateOrderRepository: UpdateOrderRepository
  ) {}

  async execute(pathParameters: UpdateOrderDTO): Promise<Order> {
    const findOrder = await this.findOrderByIdRepository.findById(
      pathParameters.id
    )

    if (!findOrder) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        NotFoundByIdError(Field.Order)
      )
    }

    const updateOrder = await this.updateOrderRepository.update(pathParameters)

    return updateOrder
  }
}
