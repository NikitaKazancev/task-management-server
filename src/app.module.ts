import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { TasksModule } from './components/tasks/tasks.module'
import { UserModule } from './components/user/user.module'

@Module({
	imports: [ConfigModule.forRoot(), AuthModule, UserModule, TasksModule],
})
export class AppModule {}
