import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PomodoroModule } from '../pomodoro/pomodoro.module'
import { TasksModule } from '../tasks/tasks.module'
import { TimeBlockModule } from '../time-block/time-block.module'
import { CurrentUserPomodoroController } from './currentUser/current-user-pomodoro.controller'
import { CurrentUserTasksController } from './currentUser/current-user-tasks.controller'
import { CurrentUserTimeBlockController } from './currentUser/current-user-time-blocks.controller'
import { CurrentUserController } from './currentUser/current-user.controller'
import { UserController } from './user.controller'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'

@Module({
	imports: [TasksModule, TimeBlockModule, PomodoroModule],
	controllers: [
		UserController,
		CurrentUserController,
		CurrentUserTasksController,
		CurrentUserTimeBlockController,
		CurrentUserPomodoroController,
	],
	providers: [UserService, PrismaService, UserRepository],
	exports: [UserService, UserRepository],
})
export class UserModule {}
