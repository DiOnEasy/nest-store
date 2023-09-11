import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class StatisticService {
	constructor(
		private prisma: PrismaService,
		private userService: UserService
	) {}



	async getMainStatistic(userId: number) {
		const user = await this.userService.byId(userId, {
			orders: {
				select: {
					items: true
				}
			},
			reviews: true
		})

    //    return user.orders

		return [
			{
				name: 'Orders',
				value: user.orders.length
			},{
				name: 'Reviews',
				value: user.reviews.length
			},{
				name: 'Favorites',
				value: user.favorites.length
			},{
				name: 'Total amounts',
				value: 1000
			},
		]
	}
}
