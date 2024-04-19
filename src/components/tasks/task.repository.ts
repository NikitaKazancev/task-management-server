import { Injectable } from '@nestjs/common'
import { startOfDay, subDays } from 'date-fns'
import { PrismaService } from 'src/prisma.service'
import { TaskDto } from './dto/task.dto'

@Injectable()
export class TasksRepository {
	constructor(private readonly prisma: PrismaService) {}

	findAllByUserId(userId: string) {
		return this.prisma.task.findMany({
			where: { userId },
		})
	}

	findCompletedTasksAmountByUserId(userId: string) {
		return this.prisma.task.count({
			where: {
				userId,
				isCompleted: true,
			},
		})
	}

	findTodayTasksAmountByUserId(userId: string) {
		return this.prisma.task.count({
			where: {
				userId,
				createdAt: {
					gte: startOfDay(new Date()).toISOString(),
				},
			},
		})
	}

	findWeekTasksAmountByUserId(userId: string) {
		return this.prisma.task.count({
			where: {
				userId,
				createdAt: {
					gte: startOfDay(subDays(new Date(), 7)).toISOString(),
				},
			},
		})
	}

	createByUserId(task: TaskDto, userId: string) {
		return this.prisma.task.create({
			data: {
				...task,
				user: {
					connect: {
						id: userId,
					},
				},
			},
		})
	}

	updateByIdAndUserId(task: Partial<TaskDto>, taskId: string, userId: string) {
		return this.prisma.task.update({
			data: task,
			where: {
				id: taskId,
				userId,
			},
		})
	}

	deleteByIdAndUserId(taskId: string, userId: string) {
		return this.prisma.task.delete({
			where: {
				id: taskId,
				userId,
			},
		})
	}
}
