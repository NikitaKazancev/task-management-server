import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { TimeBlockDto } from 'src/components/time-block/dto/time-block.dto'
import { TimeBlockUpdateOrderDto } from 'src/components/time-block/dto/update-time-block-order.dto'
import { TimeBlockService } from 'src/components/time-block/time-block.service'

@Controller('current-user/time-blocks')
export class CurrentUserTimeBlockController {
	constructor(private readonly timeBlockService: TimeBlockService) {}

	@Auth()
	@Get()
	findAll(@CurrentUser('id') userId: string) {
		return this.timeBlockService.findAllByUserId(userId)
	}

	@Auth()
	@HttpCode(200)
	@Post()
	create(@CurrentUser('id') userId: string, @Body() timeBlock: TimeBlockDto) {
		return this.timeBlockService.createByUserId(timeBlock, userId)
	}

	@Auth()
	@Put('update-order')
	async updateOrders(
		@CurrentUser('id') userId: string,
		@Body() dto: TimeBlockUpdateOrderDto
	) {
		const res = await this.timeBlockService.updateOrdersByUserId(dto, userId)
		return res
	}

	@Auth()
	@Put(':id')
	updateById(
		@CurrentUser('id') userId: string,
		@Body() timeBlock: TimeBlockDto,
		@Param('id') timeBlockId: string
	) {
		return this.timeBlockService.updateByIdAndUserId(
			timeBlock,
			timeBlockId,
			userId
		)
	}
	@Auth()
	@Delete(':id')
	deleteById(
		@CurrentUser('id') userId: string,
		@Param('id') timeBlockId: string
	) {
		return this.timeBlockService.deleteByIdAndUserId(timeBlockId, userId)
	}
}
