import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { generateSlug } from 'src/utils/generate-slug'
import { CategoryDto } from './category.dto'
import { returnCategoryObject } from './return-category.object'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async byId(id: number) {
		const category = await this.prisma.category.findUnique({
			where: {
				id
			},
			select: returnCategoryObject
		})

		if (!category) {
			throw new Error('Category is not found')
		}

		return category
	}
	async bySlug(slug: string) {
		const category = await this.prisma.category.findUnique({
			where: {
				slug
			},
			select: returnCategoryObject
		})

		if (!category) {
			throw new Error('Category is not found')
		}

		return category
	}
	async getAllCategory() {
		return this.prisma.category.findMany({
			select: returnCategoryObject
		})
	}
	async updateCategory(id: number, dto: CategoryDto) {
		return this.prisma.category.update({
			where: {
				id
			},
			data: {
				name: dto.name,
				slug: generateSlug(dto.name)
			}
		})
	}

	async deleteCategory(id: number) {
		return this.prisma.category.delete({
			where: {
				id
			}
		})
	}

	async createCategoty() {
		return this.prisma.category.create({
			data: {
				name: '',
				slug: ''
			}
		})
	}
}
