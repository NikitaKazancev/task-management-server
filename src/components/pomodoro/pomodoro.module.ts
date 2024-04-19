import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PomodoroController } from './pomodoro.controller'
import { PomodoroRepository } from './pomodoro.repository'
import { PomodoroService } from './pomodoro.service'

@Module({
	controllers: [PomodoroController],
	providers: [PomodoroService, PrismaService, PomodoroRepository],
	exports: [PomodoroService, PomodoroRepository],
})
export class PomodoroModule {}
