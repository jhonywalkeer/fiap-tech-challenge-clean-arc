import { IdentifierDTO } from '@application/dtos/common'

export class UpdateProductDTO extends IdentifierDTO {
  name: string
  description: string
  price: number
  category_id: string

  constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    category_id: string
  ) {
    super(id)
    this.name = name
    this.description = description
    this.price = price
    this.category_id = category_id
  }
}
