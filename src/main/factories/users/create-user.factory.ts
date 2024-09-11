import { CreateUserUC } from '@application/usecases/users'
import { User } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  CreateUserPrismaRepository,
  FindUserByIdPrismaRepository
} from '@infrastructure/persistence/database/repositories/user'
import { CreateUserController } from '@presentation/controllers/users'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const CreateUserControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const findUserByIdRepository = new FindUserByIdPrismaRepository(
    databaseConnection
  )
  const createUserRepository = new CreateUserPrismaRepository(
    databaseConnection
  )
  const createUserUseCase = new CreateUserUC(
    findUserByIdRepository,
    createUserRepository
  )
  const genericSucessPresenter = new HttpGenericResponse<User>()
  const createUserController = new CreateUserController(
    createUserUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    findUserByIdRepository,
    createUserRepository,
    createUserUseCase,
    createUserController
  }
}
