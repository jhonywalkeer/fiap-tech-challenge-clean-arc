import { ErrorName, StatusCode } from '@common/enums'
import { BadRequestError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Field } from '@domain/enums'
import { Size } from '@domain/enums/size.enum'
import {
  IsStringValidator,
  IsNumberValidator,
  IsEnumValidator
} from '@presentation/validators'

export class CreateProductDTO {
  name: string
  description: string
  category_id: string
  price: number
  size: Size

  constructor(
    name: string,
    description: string,
    category_id: string,
    price: number,
    size: Size
  ) {
    if (!name || !description || !category_id || !price || !size) {
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.InvalidBody,
        BadRequestError()
      )
    }

    this.name = IsStringValidator(name, Field.Name)
    this.description = IsStringValidator(description, Field.Description)
    this.category_id = IsStringValidator(category_id, Field.CategoryIdentifier)
    this.price = IsNumberValidator(price, Field.Price)
    this.size = IsEnumValidator(size.toUpperCase(), Size, Field.Size) as Size
  }
}
