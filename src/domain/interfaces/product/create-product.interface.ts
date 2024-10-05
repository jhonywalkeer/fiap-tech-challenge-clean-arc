import { Size } from '@domain/enums'

import { Category } from '../category/category.interface'

export interface CreateProduct {
  name: string
  description: string
  category_id: string
  price: number
  size: Size
  category?: Category
}
