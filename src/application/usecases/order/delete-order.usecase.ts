import {
  DeleteOrderRepository,
  FindOrderByIdRepository
} from '@application/repositories/order'
import {
  DeleteOrderItemRepository,
  FindOrderItemByConditionRepository
} from '@application/repositories/order-item'
import { ErrorName, StatusCode } from '@common/enums'
import { DeleteOrNotExistsError } from '@common/errors'
import { Identifier } from '@common/interfaces'
import { HttpException } from '@common/utils/exceptions'
import { Field } from '@domain/enums'
import { DeleteOrderUseCase } from '@domain/usecases/order'

export class DeleteOrderUC implements DeleteOrderUseCase {
  constructor(
    private readonly findOrderByIdRepository: FindOrderByIdRepository,
    private readonly findOrderItemByConditionRepository: FindOrderItemByConditionRepository,
    private readonly deleteOrderItemsRepository: DeleteOrderItemRepository,
    private readonly deleteOrderRepository: DeleteOrderRepository
  ) {}

  async execute(payload: Identifier): Promise<void> {
    const findOrder = await this.findOrderByIdRepository.findById(payload)

    if (!findOrder) {
      throw new HttpException(
        StatusCode.NoContent,
        ErrorName.NotFoundInformation,
        DeleteOrNotExistsError(Field.Order)
      )
    }

    const findOrderItem =
      await this.findOrderItemByConditionRepository.findByCondition({
        ids: [findOrder.id]
      })

    const deleteOrderItem = await this.deleteOrderItemsRepository.delete({
      ids: findOrderItem?.map((item) => item?.id)
    })

    console.info(deleteOrderItem)

    return await this.deleteOrderRepository.delete(payload)
  }
}
