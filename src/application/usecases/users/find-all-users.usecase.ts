import { FindAllUsersDTO } from '@application/dtos/user'
import { FindAllUsersRepository } from '@application/repositories/user'
import { User } from '@domain/entities'
import { FindAllUsersUseCase } from '@domain/usecases/user'

export class FindAllUsersUC implements FindAllUsersUseCase {
  constructor(
    private readonly findAllUsersRepository: FindAllUsersRepository
  ) {}
  async execute(queryParameters: FindAllUsersDTO): Promise<User[] | null> {
    return await this.findAllUsersRepository.findAll(queryParameters)
  }
}
