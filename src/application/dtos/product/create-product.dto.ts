import { HttpException } from '@common/utils/exceptions'
import { IsStringValidator, IsNumberValidator } from '@presentation/validators'
import { StatusCode, ErrorName, ErrorMessage, Field } from '@domain/enums'

export class CreateProductDTO {
  name: string
  description: string
  category_id: string
  price: number

  constructor(
    name: string,
    description: string,
    category_id: string,
    price: number
  ) {
    if (!name || !description || !category_id) {
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.InvalidBody,
        ErrorMessage.BodyInvalid
      )
    }

    this.name = IsStringValidator(name, Field.name)
    this.description = IsStringValidator(description, Field.name)
    this.category_id = IsStringValidator(category_id, Field.categoryIdentifier)
    this.price = IsNumberValidator(price, Field.price)
  }
}
