import { IdentifierDTO } from '@application/dtos/common'

export class UpdateCategoryDTO extends IdentifierDTO {
  name: string
  description: string

  constructor(id: string, name: string, description: string) {
    super(id)
    this.name = name
    this.description = description
  }
}
