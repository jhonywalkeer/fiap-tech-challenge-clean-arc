import { StatusCode, ErrorName } from '@common/enums'
import { BadRequestError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Field } from '@domain/enums'
import { IsStringValidator, IsNumberValidator } from '@presentation/validators'

export class FindProductWithQuantityDTO {
  product_id: string
  quantity: number

  constructor(product_id: string, quantity: number) {
    if (!product_id || !quantity) {
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.InvalidBody,
        BadRequestError()
      )
    }

    this.product_id = IsStringValidator(product_id, Field.ProductIdentifier)
    this.quantity = IsNumberValidator(quantity, Field.Quantity)
  }
}
