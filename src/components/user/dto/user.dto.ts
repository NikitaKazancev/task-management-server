import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'
import { UserPomodoroSettingsDto } from './user-pomodoro-settings.dto'

export class UserDto extends UserPomodoroSettingsDto {
	@IsEmail()
	@IsOptional()
	email?: string

	@IsString()
	@IsOptional()
	name?: string

	@IsString()
	@IsOptional()
	@MinLength(6, {
		message: 'Password must be at least 6 characters long',
	})
	password: string
}
