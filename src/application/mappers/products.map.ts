import { Product } from '@domain/entities'

export class ProductMap {
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
      created_at: product.created_at
    }
  }
}
