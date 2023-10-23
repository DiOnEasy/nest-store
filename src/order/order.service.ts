import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { PrismaService } from 'src/prisma.service'
import { returnProductObject } from 'src/product/return-product.object'
import { OrderDto } from './order.dto'
import { PaymentStatusDto } from './payment-status.dto'

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}
	async getAllOrders(userId: number) {
		return this.prisma.order.findMany({
			where: {
				userId
			},
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				items: {
					include: {
						product: {
							select: returnProductObject
						}
					}
				}
			}
		})
	}

	async createOrder(dto: OrderDto, userId: number) {
		const total = dto.items.reduce((acc, item) => {
			return acc + item.price * item.quantity
		}, 0)


		const order = await this.prisma.order.create({
			data: {
				status: dto.status,
				items: {
					create: dto.items
				},
				total,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})

		const orderBody = {
			order_id: `pknsi${order.id}`,
			order_desc: `Order №${order.id}`,
			currency: 'USD',
			amount: total * 100,
			merchant_id: '1396424',
			response_url:
				'http://m4evpj-ip-91-214-137-122.tunnelmole.net/api/orders/status'
		}

		const fondyPassword = 'test'

		const orderedKeys = Object.keys(orderBody).sort((a, b) => {
			if (a < b) return -1
			if (a < b) return 1
			return 0
		})

		const { createHash } = await import('node:crypto')

		const signatureRaw = orderedKeys.map(item => orderBody[item]).join('|')
		console.log(signatureRaw)

		const signature = createHash('sha1')
			.update(`${fondyPassword}|${signatureRaw}`)
			.digest('hex')
		console.log(signature)

		const { data } = await axios.post(
			'https://pay.fondy.eu/api/checkout/url/',
			{
				request: {
					...orderBody,
					signature
				}
			}
		)

		return data
	}

	async updateStatus(dto: PaymentStatusDto) {
		console.log(dto)
		const orderId = BigInt(parseInt(dto.order_id))
		const orderPrisma = this.prisma.order.findUnique({
			where: {
				id: 36
			}
		})
		console.log((await orderPrisma).orderFondyId === orderId)
		const status = this.prisma.order.update({
			where: {
				orderFondyId: orderId
			},
			data: {
				status: 'PAYED'
			}
		})
		return true
	}
}
