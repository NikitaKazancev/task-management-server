import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TimeBlockDto } from './dto/time-block.dto'
import { TimeBlockUpdateOrderDto } from './dto/update-time-block-order.dto'

@Injectable()
export class TimeBlockRepository {
	constructor(private readonly prisma: PrismaService) {}

	findAllByUserId(userId: string) {
		return this.prisma.timeBlock.findMany({
			where: {
				userId,
			},
			orderBy: {
				order: 'asc',
			},
		})
	}

	createByUserId(timeBlock: TimeBlockDto, userId: string) {
		return this.prisma.timeBlock.create({
			data: {
				...timeBlock,
				user: {
					connect: {
						id: userId,
					},
				},
			},
		})
	}

	updateByIdAndUserId(
		timeBlock: Partial<TimeBlockDto>,
		timeBlockId: string,
		userId: string
	) {
		return this.prisma.timeBlock.update({
			where: {
				userId,
				id: timeBlockId,
			},
			data: timeBlock,
		})
	}

	deleteByIdAndUserId(timeBlockId: string, userId: string) {
		return this.prisma.timeBlock.delete({
			where: {
				id: timeBlockId,
				userId,
			},
		})
	}

	updateOrdersByUserId(dto: TimeBlockUpdateOrderDto, userId: string) {
		return this.prisma.$transaction(async prisma => {
			const res = []

			for (let i = 0; i < dto.ids.length; i++) {
				res.push(
					await prisma.timeBlock.update({
						data: {
							order: i,
						},
						where: {
							userId,
							id: dto.ids[i],
						},
					})
				)
			}

			return res
		})
	}
}
