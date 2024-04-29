import { Injectable } from '@nestjs/common'
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
		const date = new Date()
		date.setHours(0, 0, 0, 0)

		return this.prisma.task.count({
			where: {
				userId,
				createdAt: {
					gte: date.toISOString(),
				},
			},
		})
	}

	findWeekTasksAmountByUserId(userId: string) {
		const date = new Date();
		date.setDate(date.getDate() - 7);
		date.setHours(0, 0, 0, 0)

		return this.prisma.task.count({
			where: {
				userId,
				createdAt: {
					gte: date.toISOString(),
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
