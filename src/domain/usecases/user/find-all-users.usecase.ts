import { FindAllUsersDTO } from '@application/dtos/user'
import { User } from '@domain/entities'

export interface FindAllUsersUseCase {
  execute(queryParameters: FindAllUsersDTO): Promise<User[] | null>
}
