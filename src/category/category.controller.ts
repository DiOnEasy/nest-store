import { Body, Controller, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

	@Get()
	async getAll() {
		return this.categoryService.getAllCategory()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async updateCategory(@Param('categoryId') categoryId: string, @Body() dto: CategoryDto) {
		return this.categoryService.updateCategory(+categoryId, dto)
	}

  @UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	async createCategory() {
		return this.categoryService.createCategoty()
	}


}
