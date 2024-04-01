import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TasksModule } from '../tasks/tasks.module'
import { CurrentUserTasksController } from './currentUser/current-user-tasks.controller'
import { CurrentUserController } from './currentUser/current-user.controller'
import { UserController } from './user.controller'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'

@Module({
	imports: [TasksModule],
	controllers: [
		UserController,
		CurrentUserController,
		CurrentUserTasksController,
	],
	providers: [UserService, PrismaService, UserRepository],
	exports: [UserService, UserRepository],
})
export class UserModule {}
