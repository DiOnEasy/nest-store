import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AuthDto } from './auth.dto'

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}
	async register(dto: AuthDto) {
        return "register"
		// const oldUser = await this.prisma.user.findUnique({
        //     where: {
        //         email: dto.email
        //     }
        // })

        // if(oldUser) throw new BadRequestException('User with this email exists')

        // const user = await this.prisma.user.create({
        //     data: {
        //         email: dto.email,
        //     }
        // })
        // return user
	}
}
