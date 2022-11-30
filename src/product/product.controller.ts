import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ProductModel } from './product.model/product.model'
import { FindProductDto } from './dto/find-product.dto'
import { CreateProductDto } from './dto/create-product.dto'
import { ProductService } from './product.service'
import { IdValidationPipe } from '../pipes/id-validation.pipe'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const product = await this.productService.findDyId(id)
    if (!product) throw new NotFoundException('Product not found')

    return product
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedProduct = await this.productService.deleteById(id)
    if (!deletedProduct) throw new NotFoundException('Product not found')
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: ProductModel) {
    const updatedProduct = await this.productService.updateById(id, dto)
    if (!updatedProduct) throw new NotFoundException('Product not found')

    return updatedProduct
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto) {
    return this.productService.findWithReviews(dto)
  }
}
