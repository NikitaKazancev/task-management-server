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
import { TaskDto } from 'src/components/tasks/dto/task.dto'
import { TasksService } from '../../tasks/tasks.service'

@Controller('current-user/tasks')
export class CurrentUserTasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Auth()
	@Get()
	findAll(@CurrentUser('id') userId: string) {
		return this.tasksService.findAllByUserId(userId)
	}

	@Auth()
	@HttpCode(200)
	@Post()
	create(@CurrentUser('id') userId: string, @Body() task: TaskDto) {
		return this.tasksService.createByUserId(task, userId)
	}

	@Auth()
	@Put(':id')
	updateById(
		@CurrentUser('id') userId: string,
		@Body() task: TaskDto,
		@Param('id') taskId: string
	) {
		return this.tasksService.updateByIdAndUserId(task, taskId, userId)
	}

	@Auth()
	@Delete(':id')
	deleteById(@CurrentUser('id') userId: string, @Param('id') taskId: string) {
		return this.tasksService.deleteByIdAndUserId(taskId, userId)
	}
}
