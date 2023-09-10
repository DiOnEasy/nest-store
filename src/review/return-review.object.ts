import { Prisma } from '@prisma/client'

export const returnReviewObject: Prisma.ReviewSelect = {
	user: {
		select: {
			id: true,
			email: true,
			name: true,
			avatarPath: true,
			password: false,
			phone: true
		}
	},
	createdAt: true,
	id: true,
	rating: true,
	text: true
}
