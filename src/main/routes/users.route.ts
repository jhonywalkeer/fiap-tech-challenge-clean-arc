import { ExpressRouteHttp } from '@main/adapters'
import {
  CreateUserControllerFactory,
  FindUserByIdControllerFactory,
  FindAllUsersControllerFactory
} from '@main/factories/users'
import { Router } from 'express'

export const UsersRoute = Router()

const { createUserController } = CreateUserControllerFactory()
const { findUserByIdController } = FindUserByIdControllerFactory()
const { findAllUsersController } = FindAllUsersControllerFactory()

UsersRoute.post('/', ExpressRouteHttp(createUserController))
  .get('/:cpf', ExpressRouteHttp(findUserByIdController))
  .get('/', ExpressRouteHttp(findAllUsersController))
