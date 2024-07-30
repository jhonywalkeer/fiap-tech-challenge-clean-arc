import { ExpressRouteHttp } from '@main/adapters'
import {
  CreateProductControllerFactory,
  FindProductByIdControllerFactory,
  FindAllProductsControllerFactory,
  UpdateProductControllerFactory,
  DeleteProductControllerFactory
} from '@main/factories/product'
import { Router } from 'express'

export const ProductsRoute = Router()

const { createProductController } = CreateProductControllerFactory()
const { findProductByIdController } = FindProductByIdControllerFactory()
const { findAllProductsController } = FindAllProductsControllerFactory()
const { updateProductController } = UpdateProductControllerFactory()
const { deleteProductController } = DeleteProductControllerFactory()

ProductsRoute.post('/', ExpressRouteHttp(createProductController))
  .get('/:id', ExpressRouteHttp(findProductByIdController))
  .get('/', ExpressRouteHttp(findAllProductsController))
  .patch('/:id', ExpressRouteHttp(updateProductController))
  .put('/:id', ExpressRouteHttp(updateProductController))
  .delete('/:id', ExpressRouteHttp(deleteProductController))
