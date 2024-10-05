import { Product } from '@domain/entities'

export class ProductAndCategoryMap {
  static execute(product: any, category?: any): Product {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      category: {
        id: category.id,
        name: category.name,
        description: category.description
      },
      price: product.price,
      size: product.size
    }
  }
}
