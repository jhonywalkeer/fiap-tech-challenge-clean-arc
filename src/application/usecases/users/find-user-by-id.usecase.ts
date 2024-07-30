import { FindUserByIdDTO } from '@application/dtos/user'
import { FindUserByIdRepository } from '@application/repositories/user'
import { User } from '@domain/entities'
import { FindUserByIdUseCase } from '@domain/usecases/user'

export class FindUserByIdUC implements FindUserByIdUseCase {
  constructor(
    private readonly findUserByIdRepository: FindUserByIdRepository
  ) {}
  async execute(pathParameters: FindUserByIdDTO): Promise<User | null> {
    return await this.findUserByIdRepository.findById(pathParameters)
  }
}
