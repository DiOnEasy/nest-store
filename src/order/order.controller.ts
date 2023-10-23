import { Body, Controller, Get, HttpCode, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common'
import { Response } from 'express'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { OrderDto } from './order.dto'
import { OrderService } from './order.service'
import { PaymentStatusDto } from './payment-status.dto'

@Controller('orders')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}
	@Auth()
	@Get()
	getAllOrders(@CurrentUser('id') id: number) {
		return this.orderService.getAllOrders(id)
	}
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	createOrder( @CurrentUser('id') userId: number,@Body() dto: OrderDto) {
		return this.orderService.createOrder(dto, userId)
	}

	@HttpCode(200)
	@Post('status')
	async updateStatus(@Body() dto:PaymentStatusDto,@Res() res: Response){
		await this.orderService.updateStatus(dto)

		res.redirect('http://localhost:3000')
	}
}
