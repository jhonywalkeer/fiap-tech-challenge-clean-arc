import { CreateUserDTO } from '@application/dtos/user'
import { CreateUserRepository } from '@application/repositories/user'
import { User } from '@domain/entities'
import { CreateUserUseCase } from '@domain/usecases/user'

export class CreateUserUC implements CreateUserUseCase {
  constructor(private readonly createUserRepository: CreateUserRepository) {}
  async execute(body: CreateUserDTO): Promise<User> | never {
    return await this.createUserRepository.create(body)
  }
}
