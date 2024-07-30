import { CreateUserDTO } from '@application/dtos/user'
import { User } from '@domain/entities'

export interface CreateUserUseCase {
  execute(body: CreateUserDTO): Promise<User> | never
}
