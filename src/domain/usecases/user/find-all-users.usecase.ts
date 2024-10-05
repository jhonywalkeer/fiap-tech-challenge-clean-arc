import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse } from '@common/types/paginate-response.type'
import { User } from '@domain/entities'

export interface FindAllUsersUseCase {
  execute(queryParameters: PaginationAndFilter): Promise<PaginateResponse<User>>
}
