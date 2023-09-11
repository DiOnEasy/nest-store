import { Controller, Get } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { StatisticService } from './statistic.service'

@Controller('statistic')
export class StatisticController {
	constructor(private readonly statisticService: StatisticService) {}

	@Auth()
	@Get()
	getMainStatistic(@CurrentUser('id') id: number) {
    return this.statisticService.getMainStatistic(id)
  }
}
