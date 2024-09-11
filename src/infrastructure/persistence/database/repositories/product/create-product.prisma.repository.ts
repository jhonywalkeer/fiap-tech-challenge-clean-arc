import { CreateProductDTO } from '@application/dtos/product'
import { ProductAndCategoryMap } from '@application/mappers'
import { CreateProductRepository } from '@application/repositories/product'
import { HttpException } from '@common/utils/exceptions'
import { Product } from '@domain/entities'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class CreateProductPrismaRepository implements CreateProductRepository {
  constructor(private readonly prisma: DatabaseConnection) {}

  async create(body: CreateProductDTO): Promise<Product> {
    const product = await this.prisma.product.findMany({
      where: { name: body.name },
      include: { category: true }
    })

    const category = await this.prisma.category.findUnique({
      where: { id: body.category_id }
    })

    if (!category) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        ErrorMessage.CategoryNotFound
      )
    }

    if (product.length > 0) {
      throw new HttpException(
        StatusCode.Conflict,
        ErrorName.ResourceAlreadyExists,
        ErrorMessage.ProductExists
      )
    }

    const createProduct = await this.prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        category_id: category.id,
        price: body.price,
        size: body.size
      }
    })

    return ProductAndCategoryMap.execute(createProduct, category)
  }
}
