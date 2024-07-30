import { Base } from '@domain/entities'

export class User extends Base {
  email: string
  social_security_number: string

  constructor(
    name: string,
    email: string,
    social_security_number: string,
    id?: string
  ) {
    super(name, id)
    this.email = email
    this.social_security_number = social_security_number
  }
}
