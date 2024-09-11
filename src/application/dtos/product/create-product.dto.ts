import { HttpException } from '@common/utils/exceptions'
import { IsStringValidator, IsNumberValidator } from '@presentation/validators'
import { StatusCode, ErrorName, Field } from '@domain/enums'
import { BadRequestError } from '@common/errors'

export class CreateProductDTO {
  name: string
  description: string
  category_id: string
  price: number
  size: string

  constructor(
    name: string,
    description: string,
    category_id: string,
    price: number,
    size: string
  ) {
    if (!name || !description || !category_id || !price || !size) {
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.InvalidBody,
        BadRequestError()
      )
    }

    this.name = IsStringValidator(name, Field.Name)
    this.description = IsStringValidator(description, Field.Name)
    this.category_id = IsStringValidator(category_id, Field.CategoryIdentifier)
    this.price = IsNumberValidator(price, Field.Price)
    this.size = IsStringValidator(size, Field.Size)
  }
}
