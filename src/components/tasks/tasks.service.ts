import { Injectable } from '@nestjs/common'
import { TaskDto } from './dto/task.dto'
import { TasksRepository } from './task.repository'

@Injectable()
export class TasksService {
	constructor(private readonly tasksRepository: TasksRepository) {}

	async findAllByUserId(userId: string) {
		return await this.tasksRepository.findAllByUserId(userId)
	}

	async findCompletedTasksAmountByUserId(userId: string) {
		return await this.tasksRepository.findCompletedTasksAmountByUserId(userId)
	}

	async findTodayTasksAmountByUserId(userId: string) {
		return await this.tasksRepository.findTodayTasksAmountByUserId(userId)
	}

	async findWeekTasksAmountByUserId(userId: string) {
		return await this.tasksRepository.findWeekTasksAmountByUserId(userId)
	}

	async createByUserId(task: TaskDto, userId: string) {
		return await this.tasksRepository.createByUserId(task, userId)
	}

	async updateByIdAndUserId(task: TaskDto, taskId: string, userId: string) {
		return await this.tasksRepository.updateByIdAndUserId(
			task,
			taskId,
			userId
		)
	}

	async deleteByIdAndUserId(taskId: string, userId: string) {
		return await this.tasksRepository.deleteByIdAndUserId(taskId, userId)
	}
}
