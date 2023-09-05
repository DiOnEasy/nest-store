import {
	Controller,
	Param,
	Get,
	HttpCode,
	UsePipes,
	ValidationPipe,
	Put,
	Patch,
	Body
} from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserDto } from './dto/user.dto'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Auth()
	@Get('profile')
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.byId(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put('profile')
	async updateProfile(@Body() dto: UserDto, @CurrentUser('id') id: number) {
		return this.userService.updateProfile(id, dto)
	}

	@Auth()
	@HttpCode(200)
	@Patch('profile/favorites/:productId')
	async toggleFavorite(
		@Param('productId') productId: string,
		@CurrentUser('id') id: number
	) {
		return this.userService.toggleFavorite(id, +productId)
	}
}
