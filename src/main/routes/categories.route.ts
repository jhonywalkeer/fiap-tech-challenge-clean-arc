import { ExpressRouteHttp } from '@main/adapters'
import {
  CreateCategoryControllerFactory,
  FindCategoryByIdControllerFactory,
  FindAllCategoriesControllerFactory,
  UpdateCategoryControllerFactory,
  DeleteCategoryControllerFactory
} from '@main/factories/category'
import { Router } from 'express'

export const CategoriesRoute = Router()

const { createCategoryController } = CreateCategoryControllerFactory()
const { findCategoryByIdController } = FindCategoryByIdControllerFactory()
const { findAllCategoriesController } = FindAllCategoriesControllerFactory()
const { updateCategoryController } = UpdateCategoryControllerFactory()
const { deleteCategoryController } = DeleteCategoryControllerFactory()

CategoriesRoute.post('/', ExpressRouteHttp(createCategoryController))
  .get('/:id', ExpressRouteHttp(findCategoryByIdController))
  .get('/', ExpressRouteHttp(findAllCategoriesController))
  .patch('/:id', ExpressRouteHttp(updateCategoryController))
  .put('/:id', ExpressRouteHttp(updateCategoryController))
  .delete('/:id', ExpressRouteHttp(deleteCategoryController))
