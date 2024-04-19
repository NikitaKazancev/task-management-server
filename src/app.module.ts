import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { PomodoroModule } from './components/pomodoro/pomodoro.module'
import { TasksModule } from './components/tasks/tasks.module'
import { TimeBlockModule } from './components/time-block/time-block.module'
import { UserModule } from './components/user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		TasksModule,
		TimeBlockModule,
		PomodoroModule,
	],
})
export class AppModule {}
