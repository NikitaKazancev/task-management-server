import { Injectable } from '@nestjs/common'
import { TimeBlockDto } from './dto/time-block.dto'
import { TimeBlockUpdateOrderDto } from './dto/update-time-block-order.dto'
import { TimeBlockRepository } from './time-block.repository'

@Injectable()
export class TimeBlockService {
	constructor(private readonly timeBlockRepository: TimeBlockRepository) {}

	async findAllByUserId(userId: string) {
		return await this.timeBlockRepository.findAllByUserId(userId)
	}

	async createByUserId(timeBlock: TimeBlockDto, userId: string) {
		return await this.timeBlockRepository.createByUserId(timeBlock, userId)
	}

	async updateByIdAndUserId(
		timeBlock: TimeBlockDto,
		timeBlockId: string,
		userId: string
	) {
		return await this.timeBlockRepository.updateByIdAndUserId(
			timeBlock,
			timeBlockId,
			userId
		)
	}

	async deleteByIdAndUserId(timeBlockId: string, userId: string) {
		return await this.timeBlockRepository.deleteByIdAndUserId(
			timeBlockId,
			userId
		)
	}

	async updateOrdersByUserId(dto: TimeBlockUpdateOrderDto, userId: string) {
		return await this.timeBlockRepository.updateOrdersByUserId(dto, userId)
	}
}
