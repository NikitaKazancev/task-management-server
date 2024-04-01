import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TasksRepository } from './task.repository'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'

@Module({
	controllers: [TasksController],
	providers: [TasksService, PrismaService, TasksRepository],
	exports: [TasksService, TasksRepository],
})
export class TasksModule {}
