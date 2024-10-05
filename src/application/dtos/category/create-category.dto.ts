import { StatusCode, ErrorName } from '@common/enums'
import { BadRequestError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Field } from '@domain/enums'
import { IsStringValidator } from '@presentation/validators'

export class CreateCategoryDTO {
  name: string
  description: string

  constructor(name: string, description: string) {
    if (!name || !description) {
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.InvalidBody,
        BadRequestError()
      )
    }

    this.name = IsStringValidator(name, Field.Name)
    this.description = IsStringValidator(description, Field.Description)
  }
}
