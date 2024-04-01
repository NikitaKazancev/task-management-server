import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TasksRepository } from '../tasks/task.repository'
import { UserDto } from './dto/user.dto'

@Injectable()
export class UserRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly tasksRepository: TasksRepository
	) {}

	findByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: {
				email,
			},
		})
	}

	findProfile(userId: string) {
		return this.prisma.$transaction(async prisma => {
			const { pomodoroSessions, userTimer, ...user } =
				await prisma.user.findFirst({
					include: {
						pomodoroSessions: {
							include: {
								rounds: true,
							},
						},
						userTimer: true,
					},
					where: {
						id: userId,
					},
				})

			const completedTasks =
				await this.tasksRepository.findCompletedTasksAmountByUserId(userId)
			const todayTasks =
				await this.tasksRepository.findTodayTasksAmountByUserId(userId)
			const weekTasks =
				await this.tasksRepository.findWeekTasksAmountByUserId(userId)
			const amountOfTasks = await prisma.task.count({
				where: {
					userId,
				},
			})

			return {
				user,
				pomodoro: pomodoroSessions,
				timer: userTimer,
				tasks: {
					completed: completedTasks,
					today: todayTasks,
					onWeek: weekTasks,
					amount: amountOfTasks,
				},
			}
		})
	}

	create(user: { email: string; name: string; password: string }) {
		return this.prisma.$transaction(async tx => {
			const createdUser = await tx.user.create({
				data: user,
			})

			const timer = await tx.userTimer.create({
				data: {
					userId: createdUser.id,
				},
			})

			return { ...createdUser, timer }
		})
	}

	update(id: string, user: Partial<UserDto>) {
		return this.prisma.user.update({
			where: {
				id,
			},
			data: user,
			select: {
				name: true,
				email: true,
			},
		})
	}
}