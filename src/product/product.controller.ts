import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { getAllProductDto } from './dto/get-all-products.dto'
import { ProductDto } from './dto/product.dto'
import { ProductService } from './product.service'

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	async getAllProducts(@Query() queryDto: getAllProductDto) {
		return this.productService.getAllProduct(queryDto)
	}
	@Get('similar/:id')
	async getSimilarProducts(@Param('id') id: string) {
		return this.productService.getSimilarProducts(+id)
	}

	@Get('by-slug/:slug')
	async getProductBySlug(@Param('slug') slug: string) {
		return this.productService.bySlug(slug)
	}

	@Get('by-category/:categorySlug')
	async getProductByCategory(@Param('categorySlug') categorySlug: string) {
		return this.productService.byCategory(categorySlug)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	async createProduct() {
		return this.productService.createProduct()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async updateProduct(@Param('id') id: string, @Body() dto: ProductDto) {
		return this.productService.updateProduct(+id, dto)
	}
	@HttpCode(200)
	@Auth()
	@Delete(':id')
	async deleteProduct(@Param('id') id: string) {
		return this.productService.deleteProduct(+id)
	}

	@Auth()
	@Get(':id')
	async getProduct(@Param('id') id: string) {
		return this.productService.byId(+id)
	}
}
