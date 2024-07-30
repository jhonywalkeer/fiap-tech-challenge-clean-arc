import { CreateUserUC } from '@application/usecases/users'
import { User } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { CreateUserPrismaRepository } from '@infrastructure/persistence/database/repositories/user'
import { CreateUserController } from '@presentation/controllers/users'
import { HttpGenericResponse } from '@presentation/protocols/http'

export const CreateUserControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const userRepository = new CreateUserPrismaRepository(databaseConnection)
  const createUserUseCase = new CreateUserUC(userRepository)
  const genericSucessPresenter = new HttpGenericResponse<User>()
  const createUserController = new CreateUserController(
    createUserUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    userRepository,
    createUserUseCase,
    createUserController
  }
}
