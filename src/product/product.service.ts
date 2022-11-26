import { Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { ProductModel } from './product.model/product.model'
import { InjectModel } from 'nestjs-typegoose'
import { CreateProductDto } from './dto/create-product.dto'
import { FindProductDto } from './dto/find-product.dto'
import { ReviewModel } from '../review/review.model/review.model'

@Injectable()
export class ProductService {
  constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) {}

  async create(dto: CreateProductDto) {
    return this.productModel.create(dto)
  }
  async findDyId(id: string) {
    return this.productModel.findById(id).exec()
  }
  async deleteById(id: string) {
    return this.productModel.findByIdAndDelete(id).exec()
  }
  async updateById(id: string, dto: CreateProductDto) {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec()
  }
  async findWithReviews(dto: FindProductDto) {
    return (await this.productModel
      .aggregate([
        {
          $match: {
            categories: dto.category,
          },
        },
        {
          $sort: { _id: 1 },
        },
        {
          $limit: dto.limit,
        },
        {
          $lookup: { from: 'Review', localField: '_id', foreignField: 'productId', as: 'review' },
        },
        {
          $addFields: {
            reviewCount: { $size: '$review' },
            reviewAvg: { $avg: '$review.rating' },
          },
        },
      ])
      .exec()) as (ProductModel & {
      review: ReviewModel[]
      reviewCount: number
      reviewAvg: number
    })[]
  }
}
