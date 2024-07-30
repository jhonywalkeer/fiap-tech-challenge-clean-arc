import { FindUserByIdDTO } from '@application/dtos/user'
import { User } from '@domain/entities'

export interface FindUserByIdUseCase {
  execute(queryParameters: FindUserByIdDTO): Promise<User | null>
}
