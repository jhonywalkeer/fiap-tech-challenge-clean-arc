import { Base } from '@domain/entities'

export class Category extends Base {
  description: string

  constructor(name: string, description: string, id?: string) {
    super(name, id)
    this.description = description
  }
}
