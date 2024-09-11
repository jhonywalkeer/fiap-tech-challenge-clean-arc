import { IsStringValidator } from '@presentation/validators'
import { HttpException } from '@common/utils/exceptions'
import { ErrorName, Field, StatusCode } from '@domain/enums'
import { BadRequestError } from '@common/errors'

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
