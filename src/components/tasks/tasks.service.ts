import { Injectable } from '@nestjs/common'
import { TaskDto } from './dto/task.dto'
import { TasksRepository } from './task.repository'

@Injectable()
export class TasksService {
	constructor(private readonly tasksRepository: TasksRepository) {}

	async findByUserId(userId: string) {
		return await this.tasksRepository.findByUserId(userId)
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

	async updateByTaskIdAndUserId(
		task: TaskDto,
		taskId: string,
		userId: string
	) {
		return await this.tasksRepository.updateByTaskIdAndUserId(
			task,
			taskId,
			userId
		)
	}

	async deleteByTaskIdAndUserId(taskId: string, userId: string) {
		return await this.tasksRepository.deleteByTaskIdAndUserId(taskId, userId)
	}
}
