import { DeleteOrderDTO } from '@application/dtos/order'
import {
  DeleteOrderRepository,
  FindOrderByIdRepository
} from '@application/repositories/order'
import { DeleteOrNotExistsError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { ErrorName, Field, StatusCode } from '@domain/enums'
import { DeleteOrderUseCase } from '@domain/usecases/order'

export class DeleteOrderUC implements DeleteOrderUseCase {
  constructor(
    private readonly findOrderByIdRepository: FindOrderByIdRepository,
    private readonly deleteOrderRepository: DeleteOrderRepository
  ) {}

  async execute(pathParameters: DeleteOrderDTO): Promise<void> {
    const findOrder = await this.findOrderByIdRepository.findById({
      id: pathParameters.id
    })

    if (!findOrder || findOrder === null) {
      throw new HttpException(
        StatusCode.NoContent,
        ErrorName.NotFoundInformation,
        DeleteOrNotExistsError(Field.Order)
      )
    }
    return await this.deleteOrderRepository.delete(pathParameters)
  }
}
