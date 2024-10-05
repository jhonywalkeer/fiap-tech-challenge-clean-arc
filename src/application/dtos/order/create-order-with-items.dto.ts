import { ErrorName, StatusCode } from '@common/enums'
import { BadRequestError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Field } from '@domain/enums'
import { IsStringValidator } from '@presentation/validators'

import { FindProductWithQuantityDTO } from '../product'

export class CreateOrderWithItemsDTO {
  items: FindProductWithQuantityDTO[]
  customer: string
  observation?: string

  constructor(
    items: FindProductWithQuantityDTO[],
    customer: string,
    field: Partial<{ observation: string }>
  ) {
    if (!items || !customer) {
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.InvalidBody,
        BadRequestError()
      )
    }

    if (field.observation) {
      this.observation = IsStringValidator(field.observation, Field.Observation)
    }
    this.items = items
    this.customer = IsStringValidator(customer, Field.CustomerIdentifier)
  }
}
