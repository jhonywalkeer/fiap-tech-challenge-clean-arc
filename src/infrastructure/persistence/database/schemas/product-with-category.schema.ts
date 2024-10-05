import { CategorySchema } from './category.schema'
import { ProductSchema } from './product.schema'

export interface ProductWithCategorySchema extends ProductSchema {
  category: CategorySchema
}
