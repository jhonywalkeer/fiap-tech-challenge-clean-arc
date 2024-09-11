import { CreateOrderItemDTO } from '@application/dtos/order-item/create-order-item.dto'
import { IsStringValidator } from '@presentation/validators'
import { HttpException } from '@common/utils/exceptions'
import { ErrorName, Field, StatusCode } from '@domain/enums'
import { BadRequestError } from '@common/errors'

export class CreateOrderWithItemsDTO {
  items: CreateOrderItemDTO[]
  customer: string
  observation?: string

  constructor(
    items: CreateOrderItemDTO[],
    customer: string,
    observation?: string
  ) {
    if (!items || !customer) {
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.InvalidBody,
        BadRequestError()
      )
    }
    IsStringValidator(customer, Field.CustomerIdentifier)
    this.items = items
    this.customer = customer
    this.observation = observation
  }
}
